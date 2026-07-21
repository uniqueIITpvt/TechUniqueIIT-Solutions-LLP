import { BlogHero } from '@/components/Blogs/BlogHero';
import { BlogCategories } from '@/components/Blogs/BlogCategories';
import FeaturedBlogs from '@/components/Blogs/FeaturedBlogs';
import BlogList from '@/components/Blogs/BlogList';
import { NewsletterCTA } from '@/components/Blogs/NewsletterCTA';

export default function BlogsPage() {
  return (
    <div className='min-h-screen bg-gray-50 pb-16 md:pb-0'>
      <BlogHero />
      <FeaturedBlogs />
      <BlogList />
      <NewsletterCTA />
    </div>
  );
}
