import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollVideoHeroProps {
  frameCount: number;
  framePrefix?: string;
  heightVh?: number;
  preloadAhead?: number;
  fallbackSrc: string;
  fallbackAlt: string;
  className?: string;
  children?: ReactNode;
}

function getFrameSrc(prefix: string, index: number): string {
  return `${prefix}${String(index).padStart(4, '0')}.webp`;
}

export default function ScrollVideoHero({
  frameCount,
  framePrefix = '/frames/frame_',
  heightVh = 300,
  preloadAhead = 10,
  fallbackSrc,
  fallbackAlt,
  className = '',
  children,
}: ScrollVideoHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const framePromisesRef = useRef<(Promise<HTMLImageElement> | null)[]>([]);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const drawFrame = useCallback((frame: HTMLImageElement) => {
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

    const frameAspect = frame.naturalWidth / frame.naturalHeight;
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

    ctx.drawImage(frame, x, y, drawWidth, drawHeight);
  }, []);

  const loadFrame = useCallback((index: number): Promise<HTMLImageElement> => {
    const cachedFrame = framesRef.current[index];
    if (cachedFrame) {
      return Promise.resolve(cachedFrame);
    }

    const pending = framePromisesRef.current[index];
    if (pending) {
      return pending;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        framesRef.current[index] = img;
        framePromisesRef.current[index] = null;
        resolve(img);
      };

      img.onerror = () => {
        framePromisesRef.current[index] = null;
        reject(new Error(`Failed to load frame ${index + 1}`));
      };

      img.src = getFrameSrc(framePrefix, index + 1);
    });

    framePromisesRef.current[index] = promise;
    return promise;
  }, [framePrefix]);

  useEffect(() => {
    framesRef.current = new Array(frameCount).fill(null);
    framePromisesRef.current = new Array(frameCount).fill(null);
    currentFrameRef.current = -1;
    setIsFirstFrameReady(false);
    setHasError(false);

    let cancelled = false;

    void loadFrame(0)
      .then((frame) => {
        if (cancelled) return;
        drawFrame(frame);
        currentFrameRef.current = 0;
        setIsFirstFrameReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [drawFrame, frameCount, loadFrame]);

  useEffect(() => {
    if (!isFirstFrameReady) return;

    let cancelled = false;
    const batchSize = 4;

    async function preloadFrames() {
      for (let start = 1; start < frameCount; start += batchSize) {
        if (cancelled) return;

        const batch: Promise<unknown>[] = [];
        for (let index = start; index < Math.min(start + batchSize, frameCount); index++) {
          batch.push(loadFrame(index).catch(() => null));
        }

        await Promise.all(batch);
      }
    }

    void preloadFrames();

    return () => {
      cancelled = true;
    };
  }, [frameCount, isFirstFrameReady, loadFrame]);

  useEffect(() => {
    if (!isFirstFrameReady) return;

    const redrawCurrentFrame = () => {
      const frameIndex = currentFrameRef.current >= 0 ? currentFrameRef.current : 0;
      const frame = framesRef.current[frameIndex] ?? framesRef.current[0];
      if (frame) {
        drawFrame(frame);
      }
    };

    redrawCurrentFrame();
    window.addEventListener('resize', redrawCurrentFrame);

    return () => {
      window.removeEventListener('resize', redrawCurrentFrame);
    };
  }, [drawFrame, isFirstFrameReady]);

  useEffect(() => {
    if (!isFirstFrameReady || hasError) return;

    const tick = () => {
      const section = sectionRef.current;
      if (!section) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = rect.height - viewportHeight;

      if (scrollableDistance > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / scrollableDistance));
        const targetFrame = Math.min(
          frameCount - 1,
          Math.round(progress * (frameCount - 1)),
        );

        const targetImage = framesRef.current[targetFrame];
        if (targetImage && targetFrame !== currentFrameRef.current) {
          drawFrame(targetImage);
          currentFrameRef.current = targetFrame;
        }

        if (!targetImage) {
          void loadFrame(targetFrame).catch(() => null);
        }

        for (let index = 1; index <= preloadAhead; index++) {
          const ahead = targetFrame + index;
          const behind = targetFrame - index;

          if (ahead < frameCount && !framesRef.current[ahead]) {
            void loadFrame(ahead).catch(() => null);
          }

          if (behind >= 0 && !framesRef.current[behind]) {
            void loadFrame(behind).catch(() => null);
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, frameCount, hasError, isFirstFrameReady, loadFrame, preloadAhead]);

  const effectiveHeightVh = hasError ? 100 : heightVh;

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{ height: `${effectiveHeightVh}vh`, position: 'relative' }}
    >
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={fallbackSrc}
            alt={fallbackAlt}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              isFirstFrameReady && !hasError ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
              isFirstFrameReady && !hasError ? 'opacity-100' : 'opacity-0'
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
