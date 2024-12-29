'use client'

import { useState, useEffect } from 'react'
import HamburgerIcon from './components/icons/hamburger'
import '../styles/globals.css'
import Link from 'next/link'


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
              <Link href="/" className="logo-text">IceLive</Link>
              {isMobile ? (
                <button style={{ background: 'none', border: 'none'}} onClick={toggleMenu}>
                  <HamburgerIcon />
                </button>
              ) : (
                <ul style={{ display: 'flex', justifyContent: 'end', alignContent: 'center'}}>
                  <li><Link href="/" className="nav-item">Home</Link></li>
                  <li><Link href="/cams" className="nav-item">Live Streams</Link></li>
                  <li><Link href="/volcanos" className="nav-item">Volcanos Data</Link></li>
                </ul>
              )}
            </div>
            {isMobile && isMenuOpen && (
              <ul className="mt-2 space-y-2">
                <li><Link href="/" className="nav-item">Home</Link></li>
                <li><Link href="/cams" className="nav-item">Live Streams</Link></li>
                <li><Link href="/volcanos" className="nav-item">Volcanos Data</Link></li>
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

