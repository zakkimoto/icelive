'use client';
import React, { useState, useEffect } from 'react';
import ImagePopup from '../components/image/ImagePopup';
import Earthquakes from '../components/volcano/EarthquakesDynamic';
import { set } from 'mongoose';

interface Volcano {
  _id: string;
  title: string;
  earthquakes?: {
    firstUrl: string;
    secondUrl: string;
  };
  images: {
    placeholderSrc: string;
    imageSrc: string;
    titleText: string;
  }[];
}

export default function VolcanoForecast() {
  const [volcanos, setVolcanos] = useState<Volcano[]>([]); // List of volcanos fetched from the API
  const [selectedVolcano, setSelectedVolcano] = useState<Volcano | null>(null); // Currently selected volcano
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleVolcanoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true); // Set loading state
    const selectedId = event.target.value;
    const volcano = volcanos.find((v) => v._id === selectedId);
    setSelectedVolcano(volcano || null); // Update selected volcano
    setIsLoading(false); // Unset loading state
  };

  useEffect(() => {
    const fetchVolcanos = async () => {
      const response = await fetch('/api/volcanos');
      const data = await response.json();
      setVolcanos(data);
      setSelectedVolcano(data[0]); // Default to the first volcano
    };

    fetchVolcanos();
  }, []);


  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome to IceLive</h1>

      {/* Display Aviation Codes */}
      <div>
        <ImagePopup
          placeholderSrc={'https://www.vedur.is/photos/volcanoes/volcano_status.png'}
          imageSrc={'https://www.vedur.is/photos/volcanoes/volcano_status.png'}
          altText="Image of aviation codes"
          titleText="Aviation color codes for volcanic systems"
        />
      </div>

      {/* Volcano Selection Dropdown */}
      {selectedVolcano && (
        <div>
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <label htmlFor="volcano-select" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
              Select a Volcano:
            </label>
            <select
              id="volcano-select"
              value={selectedVolcano._id}
              onChange={handleVolcanoChange}
              style={{ padding: '0.5rem', fontSize: '1rem' }}
            >
              {volcanos.map((volcano) => (
                <option key={volcano._id} value={volcano._id}>
                  {volcano.title}
                </option>
              ))}
            </select>
          </div>

          {/* Display Earthquake Information */}
          {selectedVolcano.earthquakes && !isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
              <Earthquakes
                firstUrl={selectedVolcano.earthquakes.firstUrl}
                secondUrl={selectedVolcano.earthquakes.secondUrl}
              />
            </div>
          ) : (
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <p>No earthquake data available for this volcano.</p>
            </div>
          )}

          {/* Display Images */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              padding: '1rem',
            }}
          >
            {selectedVolcano.images.map((image, index) => (
              <div
                key={index}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '400px',
                  textAlign: 'center',
                }}
              >
                <ImagePopup
                  placeholderSrc={image.placeholderSrc}
                  imageSrc={image.imageSrc}
                  altText={`Image of ${selectedVolcano.title}`}
                  titleText={image.titleText}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
