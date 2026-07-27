import { ServicesList } from '@/components/Services/ServicesList';
import { Testimonials } from '@/components/Home/Testimonials';
import { ServiceProcess } from '@/components/Services/ServiceProcess';
import { ServiceCTA } from '@/components/Services/ServiceCTA';

export default function ServicesPage() {
  return (
    <div className='pt-5 pb-16 md:pb-0'>
      {/* Services Overview & Cards */}
      <ServicesList />

      {/* Reusable Client Testimonials for immediate trust & credibility */}
      <Testimonials />

      {/* Process & CTA */}
      <ServiceProcess />
      <ServiceCTA />
    </div>
  );
}

export const metadata = {
  title: 'Services | TechUniqueIIT Solutions',
  description:
    'Custom software development, Angular, React, Next.js, Node.js, Python, .NET, SQL, Cloud (AWS, Azure, Docker, Kubernetes), software maintenance, and YouTube/Digital Marketing.',
};
