import Link from 'next/link';
import type { ServicePage } from '@/data/servicePages';
import { getServicePage } from '@/data/servicePages';

type ServiceLandingPageProps = {
  service: ServicePage;
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <div className='mb-8 max-w-3xl'>
    <p className='mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600'>
      {eyebrow}
    </p>
    <h2 className='text-2xl font-bold text-gray-900 sm:text-3xl'>{title}</h2>
    {description && (
      <p className='mt-3 text-sm leading-6 text-gray-600 sm:text-base'>
        {description}
      </p>
    )}
  </div>
);

const CheckList = ({ items }: { items: string[] }) => (
  <div className='grid gap-3 sm:grid-cols-2'>
    {items.map((item) => (
      <div
        key={item}
        className='flex items-start rounded-lg border border-gray-100 bg-white p-4 shadow-sm'
      >
        <svg
          className='mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 13l4 4L19 7'
          />
        </svg>
        <span className='ml-3 text-sm font-medium leading-6 text-gray-700'>
          {item}
        </span>
      </div>
    ))}
  </div>
);

export const ServiceLandingPage = ({ service }: ServiceLandingPageProps) => {
  const relatedServices = service.relatedServices
    .map(getServicePage)
    .filter((item): item is ServicePage => Boolean(item));

  return (
    <main className='bg-white pt-20'>
      <section className='border-b border-gray-100 bg-gradient-to-b from-indigo-50/50 to-white py-12 sm:py-16 lg:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
            <div>
              <Link
                href='/services'
                className='mb-6 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700'
              >
                Back to Services
              </Link>
              <p className='mb-4 text-xs font-semibold uppercase tracking-wider text-indigo-600'>
                {service.eyebrow}
              </p>
              <h1 className='max-w-4xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl'>
                {service.title}
              </h1>
              <p className='mt-5 max-w-3xl text-lg leading-8 text-gray-600'>
                {service.heroSummary}
              </p>
              <div className='mt-7 flex flex-wrap gap-3'>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700'
                >
                  Request Consultation
                </Link>
                <a
                  href='/brochures/techuniqueiit-brochure.pdf'
                  download
                  className='inline-flex items-center justify-center rounded-lg border border-indigo-100 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50'
                >
                  Download Brochure
                </a>
              </div>
            </div>

            <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
              <h2 className='text-sm font-bold uppercase tracking-wider text-gray-900'>
                SEO Focus
              </h2>
              <div className='mt-4 flex flex-wrap gap-2'>
                {service.primaryKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className='rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700'
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className='mt-6 border-t border-gray-100 pt-5'>
                <h3 className='text-sm font-bold text-gray-900'>Best fit for</h3>
                <ul className='mt-3 space-y-2 text-sm leading-6 text-gray-600'>
                  {service.idealFor.map((item) => (
                    <li key={item} className='flex gap-2'>
                      <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-600' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-12 sm:py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <SectionHeading
            eyebrow='Capabilities'
            title={`What our ${service.shortTitle.toLowerCase()} work covers`}
            description='Each engagement is scoped around the business outcome, user workflow, and technical constraints that matter for production.'
          />
          <CheckList items={service.capabilities} />
        </div>
      </section>

      <section className='bg-gray-50 py-12 sm:py-16'>
        <div className='mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8'>
          <div>
            <SectionHeading
              eyebrow='Deliverables'
              title='What you receive'
              description='The output is structured so your team can launch, maintain, and improve the work after release.'
            />
            <CheckList items={service.deliverables} />
          </div>
          <div>
            <SectionHeading
              eyebrow='Technology'
              title='Common stack and tools'
              description='The exact stack is selected around maintainability, performance, hosting, integrations, and team fit.'
            />
            <div className='flex flex-wrap gap-2'>
              {service.technologies.map((technology) => (
                <span
                  key={technology}
                  className='rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700'
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='py-12 sm:py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <SectionHeading
            eyebrow='Process'
            title='How the engagement runs'
            description='We keep the workflow practical, with enough planning to reduce rework and enough delivery cadence to keep momentum.'
          />
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {service.process.map((step, index) => (
              <div
                key={step.title}
                className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'
              >
                <div className='mb-4 text-sm font-bold text-indigo-600'>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className='text-lg font-bold text-gray-900'>{step.title}</h3>
                <p className='mt-2 text-sm leading-6 text-gray-600'>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-gray-50 py-12 sm:py-16'>
        <div className='mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8'>
          <SectionHeading
            eyebrow='FAQ'
            title={`${service.shortTitle} questions`}
            description='Short answers to common questions before a project discussion.'
          />
          <div className='space-y-4'>
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'
              >
                <h3 className='font-bold text-gray-900'>{faq.question}</h3>
                <p className='mt-2 text-sm leading-6 text-gray-600'>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className='py-12 sm:py-16'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <SectionHeading
              eyebrow='Related Services'
              title='Plan the next part of your project'
            />
            <div className='grid gap-4 md:grid-cols-3'>
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={`/services/${relatedService.slug}`}
                  className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md'
                >
                  <h3 className='font-bold text-gray-900'>
                    {relatedService.shortTitle}
                  </h3>
                  <p className='mt-2 line-clamp-3 text-sm leading-6 text-gray-600'>
                    {relatedService.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
