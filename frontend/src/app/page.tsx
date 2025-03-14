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
      <main>
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

// Add metadata for SEO
export const metadata = {
  title: 'Contact Us | TechUniqeit',
  description:
    "Get in touch with TechUniqeit. We'd love to hear from you and discuss how we can help with your project.",
};
