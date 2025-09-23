import { BlogHero } from '@/components/Blogs/BlogHero';
import { BlogCategories } from '@/components/Blogs/BlogCategories';
import FeaturedBlogs from '@/components/Blogs/FeaturedBlogs';
import BlogList from '@/components/Blogs/BlogList';
import { NewsletterCTA } from '@/components/Blogs/NewsletterCTA';

export default function BlogsPage() {
  return (
    <div className='min-h-screen pt-16 bg-gray-50'>
      <BlogHero />
      <FeaturedBlogs />
      <BlogList />
      <NewsletterCTA />
    </div>
  );
}
