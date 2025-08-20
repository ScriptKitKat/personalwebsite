import React, { useEffect, useState } from "react";
import "./LoadingPage.scss";
import { useProgress } from "@react-three/drei";
import { useExperienceStore } from "../../stores/experienceStore";

export default function LoadingScreen({ onFinish }) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [onlyOnce, setOnlyOnce] = useState(false);

  const { progress } = useProgress();
  const { setIsExperienceReady } = useExperienceStore();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    if (progress === 100 && !onlyOnce) {
      setOnlyOnce(true);
      setShowWelcome(true);
      setIsExperienceReady();

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsVisible(false);
          if (onFinish) onFinish();
        }, 500);
      }, 2000);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [progress, onFinish, setIsExperienceReady, onlyOnce]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`loading-screen${fadeOut ? " fade-out" : ""}`}>
      {!showWelcome ? (
        <div
          className="custom-cursor"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        >
          Loading
        </div>
      ) : (
        <h1 className={`welcome-text${fadeOut ? " fade-out" : ""}`}>Welcome</h1>
      )}
    </div>
  );
}
