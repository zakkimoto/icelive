'use client';

import React from 'react';
import YouTubePlayer from './YouTubePlayer';

interface Video {
  id: string;
  title: string;
}

interface YoutubeGridPlayerProps {
  videos: Video[];
}

const YoutubeGridPlayer: React.FC<YoutubeGridPlayerProps> = ({ videos }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1rem',
        padding: '1rem',
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '100vh', // Ensures it covers at least the viewport height
        overflowX: 'hidden', // Prevent horizontal scrolling
      }}
    >
      {videos.map((video) => (
        <YouTubePlayer key={video.id} videoId={video.id} title={video.title} />
      ))}
    </div>
  );
};

export default YoutubeGridPlayer;
