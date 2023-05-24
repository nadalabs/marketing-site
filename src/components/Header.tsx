import { PrimaryButton } from '@elements/Buttons';
import { Text } from '@elements/Typography';
import { EXTERNAL_ROUTES } from '@utils/constants';
import { isMobileDevice } from '@utils/helpers';
import Image from 'next/image';

interface HeaderProps {
  partnerImage?: string;
}

export default function Header({ partnerImage }: HeaderProps) {
  const isMobile = isMobileDevice();

  const NAV_LINKS = [
    { name: 'Homeshares', link: '/homeshares' },
    { name: 'About', link: '/about' },
    { name: 'Learn', link: '/learn' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {partnerImage ? (
        <div style={{ display: 'flex' }}>
          <Image
            width={125}
            height={30}
            alt={'Cityfunds'}
            src={'/images/cityfunds.png'}
          />
          <hr
            style={{
              width: '1px',
              height: '30px',
              display: 'inline-block',
              margin: '0 24px',
            }}
          />
          <Image width={125} height={30} alt={'Altsco'} src={partnerImage} />
        </div>
      ) : (
        <Image
          width={222}
          height={64}
          alt={'Nada'}
          src={'/icons/nada-light.svg'}
        />
      )}

      <div>
        {partnerImage
          ? !isMobile && (
              <PrimaryButton
                onClick={() => window.location.replace(EXTERNAL_ROUTES.WEB_APP)}
              >
                Get Started
              </PrimaryButton>
            )
          : !isMobile && (
              <div style={{ display: 'flex' }}>
                {NAV_LINKS.map(({ name, link }, idx) => (
                  <Text style={{ color: 'white', marginRight: '24px' }}>
                    {name.toUpperCase()}
                  </Text>
                ))}

                <PrimaryButton
                  onClick={() =>
                    window.location.replace(EXTERNAL_ROUTES.WEB_APP)
                  }
                >
                  Get Started
                </PrimaryButton>
              </div>
            )}
      </div>
    </div>
  );
}
