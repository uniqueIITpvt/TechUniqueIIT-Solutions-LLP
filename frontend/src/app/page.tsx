import type { Metadata } from 'next';
import { Hero } from '@/components/Hero/Hero';
import { Features } from '@/components/Home/Features';
import { Stats } from '@/components/Home/Stats';
import { Testimonials } from '@/components/Home/Testimonials';
import { TrustedBy } from '@/components/Home/TrustedBy';
// import { PageContactSection } from '@/components/Contact/PageContactSection';
import { ContactSection } from '@/components/Contact/ContactSection';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { MobileNavigation } from '@/components/Header/MobileNavigation';

export default function HomePage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='pb-16 md:pb-0'>
        {/* Hero Section */}
        <Hero />

        {/* Main Content */}
        <div className='flex-grow'>
          <Features /> <Stats />
          <Testimonials />
          <TrustedBy />
          {/* <PageContactSection /> */}
          <ContactSection />
        </div>
      </main>
      <MobileNavigation />
      <Footer />
    </div>
  );
}

const homeTitle =
  'TechUniqueIIT Solutions LLP | Custom Software, Mobile Apps & Digital Marketing';
const homeDescription =
  'TechUniqueIIT Solutions LLP builds custom software, web applications, mobile apps, maintenance solutions, and digital marketing support for businesses in India.';

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: '/',
  },
  twitter: {
    title: homeTitle,
    description: homeDescription,
  },
};