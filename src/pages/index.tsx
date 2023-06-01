import FeaturedImage from '@components/FeaturedImage';
import KeyMetrics from '@components/KeyMetrics';
import PageLayout from '@components/PageLayout';
import { SectionWrapper } from '@elements/Containers';
import CardSlider from '@sections/CardSlider';
import FaqsSection from '@sections/FaqsSection';
import FeaturedLogos from '@sections/FeaturedLogos';
import HowItWorks from '@sections/HowItWorks';
import PageHero from '@sections/PageHero';
import PublisherCTA from '@sections/PublisherCTA';
import Testimonials from '@sections/Testimonials';
import TextSlider from '@sections/TextSlider';
import {
  EXTERNAL_ROUTES,
  FEATURED_ARTICLES,
  VALUE_PROPS,
} from '@utils/constants';

export default function HomePage() {
  return (
    <PageLayout>
      <PageHero
        heading="Own a Piece of Your Favorite City"
        primaryText="Diversified real estate portfolios with passive income in the nations top cities."
        btnText="Get Started"
        onClick={() => window.location.replace(EXTERNAL_ROUTES.WEB_APP)}
        heroImages={[
          {
            name: 'Dallas',
            imageUrl: '/images/dallas-hero.png',
            numProperties: 19,
          },
          {
            name: 'Austin',
            imageUrl: '/images/austin-hero.png',
            numProperties: 30,
          },
          {
            name: 'Miami',
            imageUrl: '/images/miami-hero.png',
            numProperties: 9,
          },
          {
            name: 'Tampa',
            imageUrl: '/images/tampa-hero.png',
            numProperties: 3,
          },
        ]}
      />
      <FeaturedLogos overline="Featured In" logos={FEATURED_ARTICLES} />
      <CardSlider
        heading="Pick your favorite Cityfund, or invest in all of them"
        primaryText={
          'Cityfunds is the only investment platform that provides direct access to diversified portfolios of owner-occupied homes in the nation’s top cities.'
        }
        cards={[
          {
            title: 'Dallas',
            description: '19 Properties',
            imageUrl: '/images/dallas.png',
          },
          {
            title: 'Austin',
            description: '30 Properties',
            imageUrl: '/images/austin.png',
          },
          {
            title: 'Miami',
            description: '9 Properties',
            imageUrl: '/images/miami.png',
          },
          {
            title: 'Tampa',
            description: '3 Properties',
            imageUrl: '/images/tampa.png',
          },
          {
            title: 'Coming Soon',
            imageUrl: '/images/coming-soon-1.png',
          },
          {
            title: 'Coming Soon',
            imageUrl: '/images/coming-soon-2.png',
          },
        ]}
      />
      <SectionWrapper>
        <FeaturedImage
          overline="Why Cityfunds?"
          heading="Location, Location, Location"
          primaryText="Investing in real estate is all about location, yet the increased
            cost of living have made desirable places unaffordable. Now, owning
            real estate in your favorite city takes less than 5 minutes."
          imageUrl="/images/location-tiles.png"
          btnText="Get Started"
          onClick={() => window.location.replace(EXTERNAL_ROUTES.WEB_APP)}
        />
        <KeyMetrics
          metrics={[
            {
              label: 'Total Investors',
              value: 7000,
              formattingFn: (val) => `${val}+`,
            },
            {
              label: 'Properties Funded',
              value: 60,
              formattingFn: (val) => `${val}+`,
            },
            {
              label: 'Avg. Portfolio Appreciation',
              value: 11.7,
              formattingFn: (val) => `${val}%`,
              decimals: 1,
            },
          ]}
        />
      </SectionWrapper>
      <SectionWrapper>
        <FeaturedImage
          overline="What am I investing in?"
          heading="Diversified Portfolios of Homes"
          primaryText="Own fractional shares of peoples homes across the nations top cities on day one."
          imageUrl="/images/location-map.png"
          btnText="Get Started"
          onClick={() => window.location.replace(EXTERNAL_ROUTES.WEB_APP)}
        />
      </SectionWrapper>
      <TextSlider
        overline="You may be wondering..."
        heading="Why Cityfunds?"
        primaryText="We have plenty of reasons."
        valueProps={VALUE_PROPS}
      />
      <FaqsSection />
      <HowItWorks
        overline="Real Estate Investing Simplified"
        steps={[
          {
            title: 'Select a City',
            description: 'Choose from our 4 cityfunds with more coming soon',
            imageUrl: '/images/screen-1.png',
          },
          {
            title: 'Invest Money',
            description: 'Connect your bank account and invest in homeshares',
            imageUrl: '/images/screen-2.png',
          },
          {
            title: 'Build Wealth',
            description:
              'Grow your portfolio  while unlocking liquid equity for home owners',
            imageUrl: '/images/screen-3.png',
          },
        ]}
        btnText="Get Started"
        onClick={() => window.location.replace(EXTERNAL_ROUTES.WEB_APP)}
        isPhoneFrame
      />
      <Testimonials
        reviews={[
          {
            name: 'Veronica S.',
            location: 'Austin, TX',
            text: 'Invested with Nada originally and have been waiting for Cityfund to release! Excited to see the how the company will grow in the next few years- love the vision!',
          },
          {
            name: 'Ryan A.',
            location: 'Dallas, TX',
            text: 'To be part of a collective of investors in a steady growth market like Miami is definitely an advantage.',
          },
          {
            name: 'William B.',
            location: 'Miami, FL',
            text: 'I’ve always wanted to try and dip my toes in real estate investing! This looks like a good way to get started and from cities around the county. Super excited',
          },
          {
            name: 'Hansen N.',
            location: 'Miami, FL',
            text: 'Love the city, and love the process of investing in real estate.',
          },
          {
            name: 'Mylie A.',
            location: 'Austin, TX',
            text: 'I like that it makes real estate investment possible to everyday people.',
          },
          {
            name: 'Mark P.',
            location: 'Dallas, TX',
            text: 'Excited to easily invest in a diversified pool of RE. Looking for income & cap gains as a hedge to public markets.',
          },
        ]}
      />
      <PublisherCTA />
    </PageLayout>
  );
}
