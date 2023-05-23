import { PrimaryButton } from '@elements/Buttons';
import {
  GreenSquare,
  Heading,
  Overline,
  PrimaryText,
} from '@elements/Typography';
import { EXTERNAL_ROUTES } from '@utils/constants';
import Image from 'next/image';
import styled from 'styled-components';

export default function LocationSection({}) {
  const STATS = [
    { label: 'Total Investors', value: 7000 },
    { label: 'Total Invested', value: 1.8 },
    { label: 'Properties Funded', value: 60 },
  ];

  return (
    <SectionWrapper>
      <ContentWrapper>
        <div style={{ position: 'relative', width: '100vw' }}>
          <Image alt={`Cover Image`} src={'/images/location.png'} fill={true} />
        </div>
        <div style={{ marginLeft: '80px' }}>
          <Overline>Why Cityfunds?</Overline>
          <Heading>Location, Location, Location</Heading>
          <PrimaryText>
            Investing in real estate is all about location, yet the increased
            cost of living have made desirable places unaffordable. Now, owning
            real estate in your favorite city takes less than 5 minutes.
          </PrimaryText>
          <PrimaryButton
            onClick={() => window.location.replace(EXTERNAL_ROUTES.WEB_APP)}
          >
            Get Started
          </PrimaryButton>
        </div>
      </ContentWrapper>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {STATS.map(({ label, value }) => (
          <div key={label}>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              {/* <CountUp end={value}>
                {({ countUpRef }) => (
                    <Heading style={{ fontSize: '115px' }}>
                      <span ref={countUpRef} />+
                    </Heading>
                )}
              </CountUp> */}
              <GreenSquare />
            </div>
            <PrimaryText>{label}</PrimaryText>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export const SectionWrapper = styled.div`
  padding: 92px 156px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  margin-bottom: 120px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;
