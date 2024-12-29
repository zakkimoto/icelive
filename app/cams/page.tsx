import React from 'react'
import YoutubeGridPlayer from '../components/player/YoutubeGridPlayer'

const videos = [
  { id: 'WnQ_qxZRq7o', title: 'Rick Astley - Never Gonna Give You Up' },
  { id: 'nAy94o115yk', title: 'Smash Mouth - All Star' },
  { id: 'faH3xrKyP_o', title: 'Darude - Sandstorm' },
  { id: 'zdVEBeJrvcs', title: 'a-ha - Take On Me' },
  { id: 'kXYiU_JCYtU', title: 'Numb - Linkin Park' },
  { id: 'fJ9rUzIMcZQ', title: 'Queen - Bohemian Rhapsody' },
]

export default function Home() {
  return (
    <>
      <div>
        <h2>Live Streams in Iceland</h2>
        <div>
          <YoutubeGridPlayer videos={videos} />
        </div>
      </div>
    </>
  )
}

