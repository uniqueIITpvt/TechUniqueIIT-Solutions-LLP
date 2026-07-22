import { ServicesList } from '@/components/Services/ServicesList';
import { ServiceProcess } from '@/components/Services/ServiceProcess';
import { ServiceCTA } from '@/components/Services/ServiceCTA';

export default function ServicesPage() {
  return (
    <div className='pt-5 pb-16 md:pb-0'>
      <ServicesList />
      <ServiceProcess />
      <ServiceCTA />
    </div>
  );
}
