import { CheckCircle2 } from 'lucide-react';
import { benefits } from '@/data/audit';

const Benefits = () => {
  return (
    <section className="py-24 bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Mai mult decât o obligație legală: un plus de credibilitate</h2>
            <p className="text-lg text-white/80 mb-8">
              Un audit statutar realizat corect transformă o cerință legală într-un instrument valoros pentru creșterea și stabilitatea afacerii tale.
            </p>
          </div>
          <div className="grid gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center gap-4">
                <CheckCircle2 className="h-6 w-6 text-brand-gold shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
