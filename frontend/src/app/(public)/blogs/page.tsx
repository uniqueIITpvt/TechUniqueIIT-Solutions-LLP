import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { BlogHero } from '@/components/Blogs/BlogHero';
import FeaturedBlogs from '@/components/Blogs/FeaturedBlogs';
import BlogList from '@/components/Blogs/BlogList';

export default function BlogsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blogs', path: '/blogs' },
        ])}
      />
      <div className='min-h-screen bg-white pb-16 md:pb-0'>
        <BlogHero />
        <FeaturedBlogs />
        <BlogList />
      </div>
    </>
  );
}

export const metadata = {
  title: 'Blogs',
  description:
    'Read TechUniqueIIT insights on software development, mobile apps, digital marketing, application maintenance, and practical technology delivery.',
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    url: '/blogs',
  },
};