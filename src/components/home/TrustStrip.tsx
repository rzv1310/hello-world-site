import { trustStripItems, trustStripItems2, trustStripItems3 } from '@/data/audit';

const TrustStrip = () => {
  const duplicatedItems = [...trustStripItems, ...trustStripItems, ...trustStripItems, ...trustStripItems, ...trustStripItems, ...trustStripItems];
  const duplicatedItems2 = [...trustStripItems2, ...trustStripItems2, ...trustStripItems2, ...trustStripItems2, ...trustStripItems2, ...trustStripItems2];
  const duplicatedItems3 = [...trustStripItems3, ...trustStripItems3, ...trustStripItems3, ...trustStripItems3, ...trustStripItems3, ...trustStripItems3];

  return (
    <div className="relative overflow-hidden h-[calc(26.8vw+220px)] bg-[#faf0e6] flex items-center justify-center">
      <div className="absolute w-[150vw] flex flex-col transform -rotate-[15deg]">
        <div className="bg-brand-navy py-6 overflow-hidden flex">
          <div className="flex animate-marquee whitespace-nowrap">
            {duplicatedItems.map((item, i) => (
              <div key={`group1-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
            {duplicatedItems.map((item, i) => (
              <div key={`group2-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-y border-gray-100 py-6 overflow-hidden flex">
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {duplicatedItems2.map((item, i) => (
              <div key={`group3-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-reverse whitespace-nowrap" aria-hidden="true">
            {duplicatedItems2.map((item, i) => (
              <div key={`group4-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-navy py-6 overflow-hidden flex">
          <div className="flex animate-marquee-bottom whitespace-nowrap">
            {duplicatedItems3.map((item, i) => (
              <div key={`group5-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-bottom whitespace-nowrap" aria-hidden="true">
            {duplicatedItems3.map((item, i) => (
              <div key={`group6-${i}`} className="flex items-center gap-3 px-8 sm:px-12">
                <item.icon className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
