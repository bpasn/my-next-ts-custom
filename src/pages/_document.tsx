
import { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import Document from 'next/document'
import React, { JSX } from 'react'
import createEmotionCache from '../utils/CreateEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
import { AppPropsType } from 'next/dist/shared/lib/utils'
export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head >
          {/* PWA primary color */}
          {/* PWA primary color */}
          <meta
            name='theme-color'
          // content={theme.palette}
          />
          <link
            rel='shortcut icon'
            href='/favicon.ico'
          />
          <meta
            name='emotion-insertion-point'
            content=''
          />
          {(this.props as any).emotionStyleTags}

        </Head>
        <body>

          <Main />
          <NextScript />
          {/* footer */}
        </body>
      </Html>
    )
  }

}
{/*  */ }
// getInitialProps ` belongs to `_document` (instead of `_app` ),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render
  const materialUiSheets = new MaterialUiServerStyleSheets()
  const styledComponentSheet = new StyledComponentSheets()
  const originalRenderPage = ctx.renderPage;


  // You can consider sharing the same Emotion cache between all the SSR request to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) => {
        // <App emotionCache={cache} {...props} />
        return (styledComponentSheet.collectStyles(<App {...props} />))
      }
    });

  const initialProps = await Document.getInitialProps(ctx);

  // this is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => {
    return (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    )
  })

  return {
    ...initialProps,
    // emotionStyleTags,
    ...materialUiSheets,
    // //Styles frament is renered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,

    ]
  }

}


