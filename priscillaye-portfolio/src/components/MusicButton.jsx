// src/components/MusicButton.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Howl } from 'howler';
import "./MusicButton.scss";

const sound = new Howl({
  src: ['/music/trustinGod.mp3'], // Place your music file in public and update the path
  volume: 0.5,
  loop: true, // Loop the music
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
                <svg
                    width="500"
                    height="500"
                    viewBox="0 0 800 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M417.578 144.002C378.218 129.282 294.696 175.999 225.576 237.119H174.375C140.427 237.119 107.87 250.606 83.8653 274.611C59.8605 298.616 46.375 331.171 46.375 365.12V429.12C46.375 463.066 59.8605 495.626 83.8653 519.632C107.87 543.635 140.427 557.12 174.375 557.12H225.576C293.096 619.2 376.618 664.96 417.578 650.56C484.778 625.6 495.974 490.56 495.974 397.12C495.974 303.679 484.778 168.962 417.578 144.002Z"
                    strokeWidth="85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="white"
                    />
                    <path
                    d="M677.127 215.039C725.098 263.044 752.049 328.134 752.049 396C752.049 463.866 725.098 528.957 677.127 576.96"
                    strokeWidth="85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="white"
                    />
                    <path
                    d="M609.252 510.4C639.246 480.394 656.097 439.703 656.097 397.277C656.097 354.851 639.246 314.165 609.252 284.16"
                    strokeWidth="85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="white"
                    />
                </svg>
                // Volume Off
                ) : (
               <svg
                    width="500"
                    height="500"
                    viewBox="0 0 800 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M366.064 567.04C430.064 624 508.464 663.04 545.584 650.56C612.784 625.6 623.984 490.557 623.984 397.117C623.984 371.197 623.984 341.76 620.464 312.641"
                    strokeWidth="85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="white"
                    />
                    <path
                    d="M596.134 200.963C592.038 188.521 585.44 177.047 576.746 167.252C568.051 157.456 557.443 149.545 545.578 144.002C506.218 129.282 422.698 175.999 353.578 237.119H302.375C268.427 237.119 235.87 250.606 211.865 274.611C187.86 298.616 174.375 331.171 174.375 365.12V429.12C174.365 453.795 181.488 477.952 194.887 498.672C208.285 519.395 227.387 535.802 249.894 545.92"
                    strokeWidth="85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="white"
                    />
                    <path
                    d="M720 77.4414L80 717.44"
                    strokeWidth="85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="white"
                    />
                </svg>
                // Volume Off icon (speaker + strike-through X)
                )}
        </button>
    );
}