import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollVideoHeroProps {
  videoSrc: string;
  heightVh?: number;
  fallbackSrc: string;
  fallbackAlt: string;
  fallbackTitle?: string;
  className?: string;
  children?: ReactNode;
}

export default function ScrollVideoHero({
  videoSrc,
  heightVh = 300,
  fallbackSrc,
  fallbackAlt,
  fallbackTitle,
  className = '',
  children,
}: ScrollVideoHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const isSeekingRef = useRef(false);
  const readyTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const drawFrame = useCallback((source: HTMLVideoElement) => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;

    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    if (!width || !height) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = Math.round(width * dpr);
    const displayHeight = Math.round(height * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const frameAspect = source.videoWidth / source.videoHeight;
    const viewportAspect = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let x = 0;
    let y = 0;

    if (frameAspect > viewportAspect) {
      drawHeight = height;
      drawWidth = height * frameAspect;
      x = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / frameAspect;
      y = (height - drawHeight) / 2;
    }

    ctx.drawImage(source, x, y, drawWidth, drawHeight);
  }, []);

  // Initialize video element
  useEffect(() => {
    const video = document.createElement('video');
    video.playsInline = true;
    video.muted = true;
    video.preload = 'auto';
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('preload', 'auto');
    videoRef.current = video;

    // Attach to DOM (hidden) — iOS Safari requires video in the document tree
    Object.assign(video.style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      opacity: '0',
      pointerEvents: 'none',
    });
    videoContainerRef.current?.appendChild(video);

    // Set src after DOM attachment and force iOS to begin loading
    video.src = videoSrc;
    video.load();

    const onLoadedMetadata = () => {
      // iOS: ensure duration is available, then trigger first frame
      if (video.readyState >= 1) {
        video.currentTime = 0.001;
      }
    };

    const onLoadedData = () => {
      // iOS: play/pause cycle to initialize the decoder, then seek
      if (video.readyState >= 2) {
        video.play().then(() => {
          video.pause();
          video.currentTime = 0.001;
        }).catch(() => {
          // Fallback: try seeking directly
          video.currentTime = 0.001;
        });
      }

      // Timeout fallback: if seeked never fires within 3s, force ready
      readyTimeoutRef.current = setTimeout(() => {
        if (!isReady) {
          setIsReady(true);
        }
      }, 3000);
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
      drawFrame(video);
      if (!isReady) {
        setIsReady(true);
      }
    };

    const onError = () => {
      console.warn('[ScrollVideoHero] Video error:', video.error?.message, video.error?.code);
      setHasError(true);
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      clearTimeout(readyTimeoutRef.current);
      video.src = '';
      video.parentElement?.removeChild(video);
      videoRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc, drawFrame]);

  // Resize handler
  useEffect(() => {
    if (!isReady) return;

    const redraw = () => {
      const video = videoRef.current;
      if (video) {
        drawFrame(video);
      }
    };

    window.addEventListener('resize', redraw);
    return () => {
      window.removeEventListener('resize', redraw);
    };
  }, [drawFrame, isReady]);

  // Scroll-driven seeking
  useEffect(() => {
    if (!isReady || hasError) return;

    const tick = () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const scrollableDistance = rect.height - viewportHeight;

      if (scrollableDistance > 0) {
        if (!video.duration || !isFinite(video.duration)) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / scrollableDistance));
        const targetTime = progress * video.duration;

        if (!isSeekingRef.current && Math.abs(video.currentTime - targetTime) > 0.01) {
          isSeekingRef.current = true;
          video.currentTime = targetTime;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [hasError, isReady]);

  const effectiveHeightVh = hasError ? 100 : heightVh;

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{ height: `${effectiveHeightVh}vh`, position: 'relative' }}
    >
      <div ref={videoContainerRef} aria-hidden="true" />
      <div
        ref={viewportRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100dvh' }}
      >
        <div className="absolute inset-0">
          <img
            src={fallbackSrc}
            alt={fallbackAlt}
            title={fallbackTitle}
            fetchPriority="high"
            className={`h-full w-full object-cover ${
              isReady && !hasError ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full ${
              isReady && !hasError ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </section>
  );
}
