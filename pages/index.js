import React from 'react';
import Head from 'next/head';

import PanoramaViewer from '../components/PanoramaViewer';
import PageStyles from './styled/Home';

const Page = () => (
  <PageStyles>
    <Head>
      <title>Conference Room Map - Applaudo Studios</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <PanoramaViewer />
  </PageStyles>
);

export default Page;
