// src/components/MusicButton.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Howl } from 'howler';
import "./MusicButton.scss";

const sound = new Howl({
  src: ['/music/trustinGod.mp3'], // Place your music file in public and update the path
  volume: 0.5,
});

export default function MusicButton() {
  const [playing, setPlaying] = useState(false);
  const location = useLocation();

    const toggleMusic = () => {
        if (playing) {
            sound.pause();
        } else {
            sound.play();
        }
        setPlaying(!playing);
    };

    // Hide button if not on homepage
    if (location.pathname !== "/") return null;


    return (
        <button className='music-button'
            onClick={toggleMusic}
            aria-label={playing ? 'Pause music' : 'Play music'}
        >
            {playing ? (
                // Pause SVG
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="8" y="7" width="4" height="18" rx="2" fill="white"/>
                    <rect x="20" y="7" width="4" height="18" rx="2" fill="white"/>
                </svg>
            ) : (
                // Play SVG
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <polygon points="10,7 26,16 10,25" fill="white"/>
                </svg>
            )}
        </button>
    );
}