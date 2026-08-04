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
import { businessProfile } from '@/data/businessProfile';

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
  'Software Development Company in Delhi NCR | TechUniqueIIT';
const homeDescription =
  'TechUniqueIIT is a software development company in Delhi NCR providing custom software, web applications, mobile apps, cloud solutions, UI/UX design and application maintenance services.';

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  keywords: [
    ...businessProfile.priorityKeywords,
    ...businessProfile.brandKeywords,
    'software development company Delhi NCR',
    'custom software company Delhi NCR',
    'web and mobile app development company Delhi',
    'cloud solutions company Delhi NCR',
    'UI UX design services Delhi NCR',
    'application maintenance services Delhi NCR',
  ],
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