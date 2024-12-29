'use client';
import React, { useEffect, useState } from 'react';
import YouTubeHorizontalScroll from './components/player/YouTubeHorizontalScroll';
import Earthquakes from './components/volcano/Earthquakes';

const videos = [
  { id: 'WnQ_qxZRq7o', title: 'Þorbjörn Wide View Volcano' },
  { id: 'nAy94o115yk', title: 'Þorbjörn Tremur Watch' },
  { id: 'faH3xrKyP_o', title: 'Þorbjörn' },
  { id: 'VIs83vmfZCk', title: 'Sylingafell Norður' },
  { id: 'k6LgRBuNNns', title: 'LIVE from Þorbjorn - Close up - Iceland volcano eruption' },
  { id: '7WaoiIyxS0w', title: 'MBL.is' },
];

export default function Home() {

  return (
    <>
      <h1>Welcome to IceLive</h1>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>Live Streams in Iceland</h2>
          <a
            href="/cams"
            style={{ textDecoration: 'underline', color: 'white' }}
          >
            View All Streams
          </a>
        </div>
        <YouTubeHorizontalScroll videos={videos} />
        <div>
          <Earthquakes />
        </div>
        <iframe src="https://aflogun.vedur.is/" />
      </div>
    </>
  );
}
