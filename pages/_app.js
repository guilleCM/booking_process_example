/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    padding: 1rem;
    font-family: sans-serif;
  }
`;

const theme = {
  colors: {
    primary: '#019592',
    secondary: '#081f2c',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
