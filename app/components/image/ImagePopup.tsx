'use client';
import React, { useState, useEffect } from 'react';

interface ImagePopupProps {
  placeholderSrc: string; // URL for the placeholder image
  imageSrc: string; // URL for the full-size image or iframe
  altText: string; // Alternative text for the images
  titleText?: string; // Optional title text
}

const ImagePopup: React.FC<ImagePopupProps> = ({
  placeholderSrc,
  imageSrc,
  altText,
  titleText,
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);


  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <>
      {/* Placeholder Image */}
      <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={togglePopup}>
        {titleText && (
          <p style={{ color: '#444', fontSize: '1rem' }}>{titleText}</p>
        )}
        <img
          src={placeholderSrc}
          alt={altText}
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '300px',
            maxHeight: '300px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
        <p>Image Fullscreen Click Here</p>
      </div>

      {/* Full-Screen Popup */}
      {isPopupVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={togglePopup}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'lightgray',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              cursor: 'pointer',
              fontSize: '1rem',
              borderRadius: '5px',
              zIndex: 1100,
            }}
          >
            Exit Fullscreen
          </button>

          {/* Full-Size Image */}
          <img
            src={imageSrc}
            alt={altText}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      )}
    </>
  );
};

export default ImagePopup;
