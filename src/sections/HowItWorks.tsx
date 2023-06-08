import { GreenSquare } from '@components/CarouselStepper';
import PhoneScreen from '@components/PhoneScreen';
import { PrimaryButton } from '@elements/Buttons';
import { SectionWrapper } from '@elements/Containers';
import {
  Heading,
  Overline,
  SecondaryHeading,
  SecondaryText,
} from '@elements/Typography';
import useIsMobile from '@hooks/useIsMobile';
import Image from 'next/image';
import Slider from 'react-slick';
import styled from 'styled-components';

interface HowItWorksProps {
  overline: string;
  steps: { title: string; description: string; imageUrl: string }[];
  btnText: string;
  onClick: () => void;
  isPhoneFrame?: boolean;
}

export default function HowItWorks({
  overline,
  steps,
  btnText,
  onClick,
  isPhoneFrame,
}: HowItWorksProps) {
  const isMobile = useIsMobile();

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: 'linear',
  };

  return (
    <SectionWrapper>
      <Slider {...settings}>
        {steps.map(({ imageUrl }, idx) => (
          <div key={idx}>
            <FlewWrapper key={idx}>
              {!isMobile && isPhoneFrame && <PhoneScreen imageUrl={imageUrl} />}

              <ContentWrapper>
                <HeaderWrapper>
                  <Overline>{overline}</Overline>
                  <Heading>How it Works</Heading>
                </HeaderWrapper>
                <TextWrapper>
                  {steps.map(({ title, description }, jdx) => (
                    <StepWrapper key={jdx}>
                      <GreenSquare
                        style={{
                          backgroundColor: idx !== jdx && '#979797',
                          marginBottom: '24px',
                        }}
                      />
                      <SecondaryHeading
                        style={{ color: idx === jdx && '#48DC95' }}
                      >
                        {title}
                      </SecondaryHeading>
                      <SecondaryText>{description}</SecondaryText>
                      {idx === jdx && (
                        <PrimaryButton onClick={onClick}>
                          {btnText}
                        </PrimaryButton>
                      )}
                    </StepWrapper>
                  ))}
                </TextWrapper>
              </ContentWrapper>

              {!isMobile && !isPhoneFrame && (
                <Image
                  width={500}
                  height={500}
                  alt={'Phone Screen'}
                  src={imageUrl}
                />
              )}
            </FlewWrapper>
          </div>
        ))}
      </Slider>
    </SectionWrapper>
  );
}

export const ContentWrapper = styled.div`
  width: 60%;
  margin-left: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    margin-left: 0;
  }
`;

export const FlewWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StepWrapper = styled.div`
  margin-right: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 2rem;
  }
`;

export const TextWrapper = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const HeaderWrapper = styled.div`
  margin-bottom: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 0;
  }
`;
