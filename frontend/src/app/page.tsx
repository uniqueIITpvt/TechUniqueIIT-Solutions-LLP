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
import Link from 'next/link';

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
          <div className="flex space-x-4">
            <Link 
              href="/login" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
      <MobileNavigation />
      <Footer />
    </div>
  );
}

// Add metadata for SEO
export const metadata = {
  title: 'TechUniqueiIIT',
  description:
    "Get in touch with TechUniqueIIT. We'd love to hear from you and discuss how we can help with your project.",
};
