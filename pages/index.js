import React from 'react';
import Head from 'next/head';

import PanoramaViewer from '../components/PanoramaViewer';

const Page = () => (
  <div>
    <Head>
      <title>Conference Room Map - Applaudo Studios</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="title" content="Conference Rooms Map - Applaudo Studios" />
      <meta
        name="description"
        content="360 Viewer and Map of our main office conference rooms."
      />

      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://as-conference-rooms.netlify.com/"
      />
      <meta
        property="og:title"
        content="Conference Rooms Map - Applaudo Studios"
      />
      <meta
        property="og:description"
        content="360 Viewer and Map of our main office conference rooms."
      />
      <meta property="og:image" content="/static/minimap-preview.jpg" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://as-conference-rooms.netlify.com/"
      />
      <meta
        property="twitter:title"
        content="Conference Rooms Map - Applaudo Studios"
      />
      <meta
        property="twitter:description"
        content="360 Viewer and Map of our main office conference rooms."
      />
      <meta property="twitter:image" content="/static/minimap-preview.jpg" />
    </Head>

    <PanoramaViewer />
  </div>
);

export default Page;
