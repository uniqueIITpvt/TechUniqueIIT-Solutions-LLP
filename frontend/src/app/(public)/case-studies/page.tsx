import { CaseStudiesHero } from '@/components/CaseStudies/CaseStudiesHero';
import { CaseStudiesList } from '@/components/CaseStudies/CaseStudiesList';
import { CaseStudiesFilter } from '@/components/CaseStudies/CaseStudiesFilter';
import { CaseStudiesTestimonials } from '@/components/CaseStudies/CaseStudiesTestimonials';
import { ServiceCTA } from '@/components/Services/ServiceCTA';
import { Suspense } from 'react';

export default function CaseStudiesPage() {
  return (
    <div className='pt-16'>
      <CaseStudiesHero />
      <Suspense
        fallback={
          <div className='py-8 bg-white border-b'>
            <div className='container mx-auto px-4 text-center'>
              Loading filters...
            </div>
          </div>
        }
      >
        <CaseStudiesFilter />
      </Suspense>
      <Suspense
        fallback={
          <div className='py-20 bg-gradient-to-b from-gray-50 to-white'>
            <div className='container mx-auto px-4 text-center'>
              Loading case studies...
            </div>
          </div>
        }
      >
        <CaseStudiesList />
      </Suspense>
      <CaseStudiesTestimonials />
      <ServiceCTA />
    </div>
  );
}
