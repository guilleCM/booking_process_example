/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import App from 'next/app';

import { profile } from '../utils/apiRoutes';
import ProfileProvider from '../context/profileContext';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    padding: 1rem;
    font-family: 'Roboto';
  }
`;

const theme = {
  colors: {
    primary: '#019592',
    secondary: '#081f2c',
    error: '#f10b0b',
  },
};

function MyApp({ Component, pageProps, profileData }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <GlobalStyle />
      <ProfileProvider profileData={profileData}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ProfileProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const profileRs = await fetch(profile);
  const profileData = await profileRs.json();
  return { ...appProps, profileData };
};

export default MyApp;
