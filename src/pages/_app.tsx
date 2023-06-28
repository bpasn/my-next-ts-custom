import * as React from 'react';
import '@/styles/globals.css'
import '@/assets/css/faa-icons.css'
import createEmotionCache from '../utils/CreateEmotionCache'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ThemeOptions from '../styles/theme/ThemeOption';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";
import { RootLayout } from '@/components';
import type { AppProps } from 'next/app';

import { wrapper } from '@/lib/store'

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache

}

//Client-side cache, shared for the whole sesion of the use in the browser.
const theme = createTheme(ThemeOptions);




const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
 
  const { Component, emotionCache = clientSideEmotionCache, pageProps, ...appProps } = props;
  const getContent = (): React.JSX.Element => {
    if (['/auth/signin', '/auth/signup'].includes(appProps.router.pathname)) {
      return <Component {...pageProps} />
    }
    return <RootLayout><Component {...pageProps} /></RootLayout>
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an eleganim consistent, and simple baseline to build upon.
        remove the margins of all browsers and apply the material design background color
        */}
        <CssBaseline />
        <SessionProvider session={...pageProps.session}>
          {getContent()}
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}


export default wrapper.withRedux(MyApp)