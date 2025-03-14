import { ServicesList } from '@/components/Services/ServicesList';
import { ServiceProcess } from '@/components/Services/ServiceProcess';
import { ServiceCTA } from '@/components/Services/ServiceCTA';

export default function ServicesPage() {
  return (
    <div className='pt-5'>
      <ServicesList />
      <ServiceProcess />
      <ServiceCTA />
    </div>
  );
}
