import {
  GreenSquare,
  Heading,
  Overline,
  PrimaryText,
  Text,
} from '@elements/Typography';
import { isMobileDevice } from '@utils/helpers';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import styled from 'styled-components';
import { urlForImage } from 'lib/sanity';

interface BlogHeroProps {
  blogPosts: {
    title: string;
    coverImage: string;
    date;
    excerpt: string;
    tag: string;
    slug: string;
  }[];
}

export default function BlogHero({ blogPosts }: BlogHeroProps) {
  const isMobile = isMobileDevice();
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  };

  return (
    <SectionWrapper>
      <Slider {...settings}>
        {blogPosts.map(
          ({ title, coverImage, date, excerpt, tag, slug }, idx) => (
            <div key={idx}>
              <div>
                <Link
                  href={`/learn/${slug}`}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <Image
                      fill
                      alt={title}
                      src={urlForImage(coverImage).height(480).width(690).url()}
                      style={{
                        borderRadius: '50px',
                        maxWidth: '50%',
                        marginRight: '48px',
                      }}
                    />
                  </div>
                  <CardWrapper>
                    <Overline>{tag}</Overline>
                    <Heading
                      style={{
                        fontSize: '32px',
                        lineHeight: '36px',
                        marginBottom: '16px',
                      }}
                    >
                      {title}
                    </Heading>
                    <PrimaryText
                      style={{ fontSize: '18px', lineHeight: '24px' }}
                    >
                      {excerpt}
                    </PrimaryText>
                    <Text style={{ fontSize: '14px', lineHeight: '18px' }}>
                      <time dateTime={date}>
                        {format(parseISO(date), 'LLLL	d, yyyy')}
                      </time>
                    </Text>
                  </CardWrapper>
                </Link>
              </div>

              <div style={{ display: 'flex' }}>
                {blogPosts.map((_, jdx) => (
                  <GreenSquare
                    key={jdx}
                    style={{
                      backgroundColor: idx !== jdx && '#B0B0B0',
                      marginRight: '8px',
                    }}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </Slider>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  padding: 150px 156px 76px 156px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px;
  }
`;

export const CardWrapper = styled.div`
  width: 50%;
  height: 480px;
  background: #ffffff;
  box-shadow: 2px 4px 25px rgba(0, 0, 0, 0.1);
  border-radius: 60px;
  padding: 50px 82px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 50px 30px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 726px;
`;
