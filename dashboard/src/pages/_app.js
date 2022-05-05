import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { LoaderProvider } from 'src/components/loader/loaderProvider';
import { InformationProvider } from 'src/components/information/informationProvider';
import { AlertProvider } from 'src/components/alert/alertProvider';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <AlertProvider>
          <LoaderProvider>
            <Head>
              <title>
                Innmov Dashboard
              </title>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <InformationProvider>
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
              </InformationProvider>
            </LocalizationProvider>
          </LoaderProvider >
        </AlertProvider>
      </ThemeProvider>
    </CacheProvider >
  );
};

export default App;
