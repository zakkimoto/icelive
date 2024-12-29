'use client';
import React, { useEffect, useState } from 'react';

const Earthquakes: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Default to null
  const [secondimageUrl, setSecondImageUrl] = useState<string | null>(null); // Default to null

  // Function to generate the image URL (always 5 minutes behind schedule)
  const generateImageUrl = (): string => {
    const now = new Date();

    // Round down to the nearest 5-minute mark
    now.setMinutes(Math.floor(now.getMinutes() / 5) * 5);
    now.setSeconds(0);
    now.setMilliseconds(0);

    // Subtract 5 minutes to ensure we're behind schedule
    now.setMinutes(now.getMinutes() - 5);

    // Adjust hour and day if necessary
    if (now.getMinutes() < 0) {
      now.setMinutes(55);
      now.setHours(now.getHours() - 1);
    }

    const year = now.getFullYear().toString().slice(2); // '24'
    const month = String(now.getMonth() + 1).padStart(2, '0'); // '12'
    const day = String(now.getDate()).padStart(2, '0'); // '18'
    const hours = String(now.getHours()).padStart(2, '0'); // '20'
    const minutes = String(now.getMinutes()).padStart(2, '0'); // '45'

    return `https://www.vedur.is/photos/jarisls/${year}${month}${day}_${hours}${minutes}.png`;
  };

  const generateSecondImageUrl = (): string => {
    const now = new Date();

    // Round down to the nearest 5-minute mark
    now.setMinutes(Math.floor(now.getMinutes() / 5) * 5);
    now.setSeconds(0);
    now.setMilliseconds(0);

    // Subtract 5 minutes to ensure we're behind schedule
    now.setMinutes(now.getMinutes() - 5);

    // Adjust hour and day if necessary
    if (now.getMinutes() < 0) {
      now.setMinutes(55);
      now.setHours(now.getHours() - 1);
    }

    const year = now.getFullYear().toString().slice(2); // '24'
    const month = String(now.getMonth() + 1).padStart(2, '0'); // '12'
    const day = String(now.getDate()).padStart(2, '0'); // '18'
    const hours = String(now.getHours()).padStart(2, '0'); // '20'
    const minutes = String(now.getMinutes()).padStart(2, '0'); // '45'

    return `https://www.vedur.is/photos/jarisls_rit/${year}${month}${day}_${hours}${minutes}.png`;
  };

  useEffect(() => {
    // Set the initial image URL
    setImageUrl(generateImageUrl());
    setSecondImageUrl(generateSecondImageUrl());

    // Update the image URL every 5 minutes
    const interval = setInterval(() => {
      setImageUrl(generateImageUrl());
      setSecondImageUrl(generateSecondImageUrl());
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h2>Live Earthquakes</h2>
      {/* Conditional Rendering to avoid empty src */}
      <div style={{display: 'flex'}}>
        <div>
          <div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Live Ground Uplift"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                }}
                onError={() => console.error('Error loading image')}
              />
            ) : (
              <p>Waiting for updated image...</p>
            )}
          </div>
          <div>
            {secondimageUrl ? (
              <img
                src={secondimageUrl}
                alt="Live Ground Uplift"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                }}
                onError={() => console.error('Error loading image')}
              />
            ) : (
              <p>Waiting for updated image...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earthquakes;
