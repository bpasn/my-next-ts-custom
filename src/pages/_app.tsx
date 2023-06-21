
import * as React from 'react';
import '@/styles/globals.css'
import '@/assets/css/faa-icons.css'
import { AppProps } from 'next/app'
import createEmotionCache from '../utils/CreateEmotionCache'
import { ThemeProvider,createTheme } from '@mui/material/styles';
import ThemeOptions from '../styles/theme/ThemeOption';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import Head from 'next/head';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

//Client-side cache, shared for the whole sesion of the use in the browser.
const theme = createTheme(ThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
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
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>

  )

}
export default MyApp