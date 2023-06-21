import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

// on the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// this assures that MUI styled are loaded first.
// It allows develops to easily override MUI styles with other styling solutions. like CSS modules.

export default function createEmotionCache() {
    let insertionPoint;

    if (isBrowser) {
        const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
            'meta[name="emotion-insertion-point"]'
        );
        insertionPoint = emotionInsertionPoint ?? undefined;
    }

    return createCache({ key: 'mui-style', insertionPoint });
}