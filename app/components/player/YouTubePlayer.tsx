import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ width: '320px', flexShrink: 0, marginRight: '1rem' }}>
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.25%', // Aspect ratio 16:9
          height: 0,
          overflow: 'hidden',
          backgroundColor: '#f0f0f0', // Optional: background during loading
        }}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <ClipLoader color="#3498db" loading={isLoading} size={50} />
          </div>
        )}

        {/* YouTube Iframe */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          onLoad={handleIframeLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
            display: isLoading ? 'none' : 'block', // Hide iframe while loading
          }}
        ></iframe>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default YouTubePlayer;
