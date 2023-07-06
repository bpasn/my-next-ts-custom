'use client';
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
import { AdminLayout, BackDrop, RootLayout } from '@/components';
import type { AppProps } from 'next/app';

import { wrapper } from '@/lib/store'
import { useDispatch} from 'react-redux';
import { Router } from 'next/router';
import { reset } from '@/lib/slices/AlertSlice';
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache

}



//Client-side cache, shared for the whole sesion of the use in the browser.
const theme = createTheme(ThemeOptions);



const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);

  Router.events.on("routeChangeStart", (url) => {
    console.log("Router is changing...")
    setLoading(true);
  })

  Router.events.on("routeChangeComplete", (url) => {
    dispatch(reset())
    console.log("Route is changing is complete ...")
    setLoading(false)
  })

  const { Component, emotionCache = clientSideEmotionCache, pageProps, ...appProps } = props;
  const getContent = (): React.JSX.Element => {
    if (['/auth/signin', '/auth/signup'].includes(appProps.router.pathname)) {
      return (
        <>
          {loading && <BackDrop />}
          <Component {...pageProps} />
        </>
      )
    } else
      if (appProps.router.pathname.startsWith("/admin") || appProps.router.pathname.startsWith("/_error")) {
        console.log("change")
        return (
          <AdminLayout >
            {loading && <BackDrop />}
            <Component  {...pageProps} />
          </AdminLayout>
        )
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