import SEO from '@/components/common/SEO';
import { OrganizationSchema, FAQSchema } from '@/components/common/StructuredData';
import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import Criteria from '@/components/home/Criteria';
import AuditCalculator from '@/components/home/AuditCalculator';
import Risks from '@/components/home/Risks';
import Services from '@/components/home/Services';
import Process from '@/components/home/Process';
import RequiredDocuments from '@/components/home/RequiredDocuments';
import Benefits from '@/components/home/Benefits';
import Target from '@/components/home/Target';
import Urgency from '@/components/home/Urgency';
import FAQ from '@/components/home/FAQ';

const Home = () => (
  <main id="main">
    <SEO
      title="Helenico Advisory | Audit Statutar & Financiar"
      description="Servicii de audit statutar și financiar pentru companii. Expertiză solidă, abordare personalizată și conformitate legală."
      path="/"
    />
    <OrganizationSchema />
    <FAQSchema />
    <Hero />
    <TrustStrip />
    <Criteria />
    <AuditCalculator />
    <Risks />
    <Services />
    <Process />
    <RequiredDocuments />
    <Benefits />
    <Target />
    <Urgency />
    <FAQ />
  </main>
);

export default Home;
