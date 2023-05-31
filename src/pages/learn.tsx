import Footer from '@components/Footer';
import Header from '@components/Header';
import BlogHero from '@sections/BlogHero';
import BlogSlider from '@sections/BlogSlider';
import { indexQuery } from 'lib/queries';
import { getClient, overlayDrafts } from 'lib/sanity.server';
import { PreviewSuspense } from 'next-sanity/preview';

// const LandingPreview = lazy(() => import('../../components/landing-preview'));

export default function LearnPage({ allPosts, preview }) {
  const tags = ['Webinars', 'Investing', 'Home Equity'];

  if (preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        {/* <LandingPreview allPosts={allPosts} /> */}
      </PreviewSuspense>
    );
  }

  return (
    <>
      <Header isDarkMode />
      <BlogHero blogPosts={allPosts} />
      {tags.map((tag, idx) => (
        <BlogSlider key={idx} tag={tag} blogPosts={allPosts} />
      ))}
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
  return {
    props: { allPosts, preview },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}
