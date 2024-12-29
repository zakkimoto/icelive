'use client'

import React, { useRef, useState, useEffect } from 'react';
import YouTubePlayer from './YouTubePlayer';

interface Video {
  id: string;
  title: string;
}

interface YouTubeHorizontalScrollProps {
  videos: Video[];
}

const YouTubeHorizontalScroll: React.FC<YouTubeHorizontalScrollProps> = ({ videos }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '50%',
            padding: '1rem',
            zIndex: 10,
            color: 'white',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ width: '2rem', height: '2rem', stroke: 'white' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {videos.map((video) => (
          <YouTubePlayer key={video.id} videoId={video.id} title={video.title} />
        ))}
      </div>
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '50%',
            padding: '1rem',
            zIndex: 10,
            color: 'white',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ width: '2rem', height: '2rem', stroke: 'white' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default YouTubeHorizontalScroll;
