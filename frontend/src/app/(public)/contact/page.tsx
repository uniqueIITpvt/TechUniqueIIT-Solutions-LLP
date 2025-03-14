import { ContactSection } from '@/components/Contact/ContactSection';

export default function ContactPage() {
  return (
    <main className='min-h-[calc(100vh-64px)] pt-10 sm:pt-15 lg:pt-20 relative bg-gradient-to-b from-white via-indigo-50/30 to-white'>
      {/* Contact Form Section */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='w-full max-w-7xl mx-auto'>
          <ContactSection />
        </div>
      </div>

      {/* Decorative footer pattern */}
      <div className='absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-indigo-50/20 overflow-hidden pointer-events-none'>
        <div
          className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)] bg-[size:3rem_3rem]'
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
          }}
        />
      </div>
    </main>
  );
}

// Add metadata for SEO
export const metadata = {
  title: 'Contact Us | TechUniqiit',
  description:
    "Get in touch with TechUniqiit. We'd love to hear from you and discuss how we can help with your project.",
};
