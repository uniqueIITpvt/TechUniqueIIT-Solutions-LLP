import Link from 'next/link';
import { businessProfile } from '@/data/businessProfile';

export const LocalSeoPanel = () => {
  return (
    <section className='relative py-12 sm:py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start'>
          <div>
            <p className='mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600'>
              Local Business Details
            </p>
            <h2 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              Software and digital services from South Delhi
            </h2>
            <p className='mt-3 text-sm leading-6 text-gray-600 sm:text-base'>
              {businessProfile.name} works with businesses across Delhi NCR and
              India for software development, application maintenance, mobile
              apps, digital marketing, and SEO services.
            </p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
              <h3 className='text-sm font-bold uppercase tracking-wider text-gray-900'>
                NAP
              </h3>
              <dl className='mt-4 space-y-3 text-sm leading-6 text-gray-600'>
                <div>
                  <dt className='font-semibold text-gray-900'>Name</dt>
                  <dd>{businessProfile.name}</dd>
                </div>
                <div>
                  <dt className='font-semibold text-gray-900'>Area</dt>
                  <dd>{businessProfile.locationDisplay}</dd>
                </div>
                <div>
                  <dt className='font-semibold text-gray-900'>Phone</dt>
                  <dd>
                    <a
                      href={businessProfile.phoneHref}
                      className='text-indigo-600 hover:text-indigo-700'
                    >
                      {businessProfile.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className='font-semibold text-gray-900'>Email</dt>
                  <dd>
                    <a
                      href={`mailto:${businessProfile.email}`}
                      className='text-indigo-600 hover:text-indigo-700'
                    >
                      {businessProfile.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className='rounded-xl border border-gray-100 bg-white p-5 shadow-sm'>
              <h3 className='text-sm font-bold uppercase tracking-wider text-gray-900'>
                Service Areas
              </h3>
              <div className='mt-4 flex flex-wrap gap-2'>
                {businessProfile.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className='rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700'
                  >
                    {area}
                  </span>
                ))}
              </div>
              <p className='mt-5 text-sm leading-6 text-gray-600'>
                Languages: {businessProfile.languages.join(', ')}
              </p>
              <Link
                href='/services'
                className='mt-5 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700'
              >
                View services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
