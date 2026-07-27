import { ProductsList } from '@/components/Products/ProductsList';

export default function ProductsPage() {
  return (
    <div className='pt-5 pb-16 md:pb-0'>
      <ProductsList />
    </div>
  );
}

export const metadata = {
  title: 'Our Products | TechUniqueIIT Solutions',
  description:
    'Explore ready-to-deploy enterprise software products by TechUniqueIIT: HRMS, LMS (Learning Management System), and Tour & Travel Management ERP.',
};
