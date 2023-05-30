import { GreenSquare, Heading, PrimaryText, Text } from '@elements/Typography';
import Slider from 'react-slick';
import styled from 'styled-components';

interface CardSliderProps {
  heading: string;
  primaryText: string;
  cards: { title: string; description?: string; imageUrl: string }[];
}

export default function CardSlider({
  heading,
  primaryText,
  cards,
}: CardSliderProps) {
  const settings = {
    dots: false,
    slidesToShow: 1,
    swipeToSlide: true,
    infinite: false,
    variableWidth: true,
  };

  return (
    <SectionWrapper>
      <Heading style={{ maxWidth: '800px' }}>{heading}</Heading>
      <PrimaryText style={{ maxWidth: '800px' }}>{primaryText}</PrimaryText>

      <Slider {...settings}>
        {cards.map(({ title, description, imageUrl }, idx) => (
          <div key={idx}>
            <CardWrapper
              style={{
                backgroundImage: `url(${imageUrl})`,
                borderRadius: '52px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Heading style={{ color: 'white' }}>{title}</Heading>
                  <GreenSquare
                    style={{ marginLeft: '4px', marginBottom: '18px' }}
                  />
                </div>
                {description && (
                  <Text style={{ color: 'white' }}>{description}</Text>
                )}
              </div>
            </CardWrapper>
          </div>
        ))}
      </Slider>
    </SectionWrapper>
  );
}

export const SectionWrapper = styled.div`
  padding: 140px 0 0 156px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 0 0 24px;
  }
`;

export const CardWrapper = styled.div`
  background-size: cover;
  width: 400px;
  height: 400px;
  padding: 40px;
  display: flex;
  align-items: flex-end;
  /* position: relative; */
  transition: ${({ theme }) => theme.transitions.ease};
  bottom: 0;
  /* margin-right: 2rem; */

  &:hover {
    box-shadow: 0px 16px 30px rgba(0, 0, 0, 0.1);
    height: 450px;
    width: 450px;
    bottom: 50px;
  }
`;
