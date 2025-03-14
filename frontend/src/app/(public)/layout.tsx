import { Header } from '@/components/Header/Header';
import { MobileNavigation } from '@/components/Header/MobileNavigation';
import { Footer } from '@/components/Footer/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-grow'>{children}</main>
      <MobileNavigation />
      <Footer />
    </div>
  );
}
