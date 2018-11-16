import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.pannellum.org/2.3/pannellum.css"
          />
          {this.props.styleTags}
          {'<!-- Global site tag (gtag.js) - Google Analytics -->'}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-129315878-1"></script>
          {`<script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'UA-129315878-1');
              </script>`}

        </Head>
        <body>
          <Main />

          <script
            type="text/javascript"
            src="https://cdn.pannellum.org/2.3/pannellum.js"
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
