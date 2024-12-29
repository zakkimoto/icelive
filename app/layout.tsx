'use client'

import { useState, useEffect } from 'react'
import HamburgerIcon from './components/icons/hamburger'
import '../styles/globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <html lang="en">
      <body>
        <div>
          <nav style={{padding: '10px 1rem'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <a href="/" className="logo-text">IceLive</a>
              {isMobile ? (
                <button style={{ background: 'none', border: 'none'}} onClick={toggleMenu}>
                  <HamburgerIcon />
                </button>
              ) : (
                <ul style={{ display: 'flex', justifyContent: 'end', alignContent: 'center'}}>
                  <li><a href="/" className="nav-item">Home</a></li>
                  <li><a href="/cams" className="nav-item">Live Streams</a></li>
                  <li><a href="/volcanos" className="nav-item">Volcanos Data</a></li>
                </ul>
              )}
            </div>
            {isMobile && isMenuOpen && (
              <ul className="mt-2 space-y-2">
                <li><a href="/" className="nav-item">Home</a></li>
                <li><a href="/cams" className="nav-item">Live Streams</a></li>
                <li><a href="/volcanos" className="nav-item">Volcanos Data</a></li>
              </ul>
            )}
          </nav>
          <main style={{margin: '20px'}}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

