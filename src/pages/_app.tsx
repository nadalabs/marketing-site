import * as Sentry from '@sentry/react';
import { setCookie } from '@utils/helpers';
import theme from '@utils/theme';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../globalstyles';

declare global {
  interface Window {
    analytics: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const {
      gclid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    } = router.query;

    setCookie('gclid', gclid as string);
    setCookie('utm_source', utm_source as string);
    setCookie('utm_medium', utm_medium as string);
    setCookie('utm_campaign', utm_campaign as string);
    setCookie('utm_content', utm_content as string);
    setCookie('utm_term', utm_term as string);
  }, []);

  if (process.env.NEXT_PUBLIC_APP_ENV !== 'localhost') {
    Sentry.init({
      environment: process.env.NEXT_PUBLIC_APP_ENV,
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [new Sentry.BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
