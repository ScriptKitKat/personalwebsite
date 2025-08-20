import React, { useEffect, useRef, useState } from "react";
import "./Overlay.scss";
import { usePageTransitionStore } from "../stores/pageTransitionStore";
import gsap from "gsap";
import { useNavigate } from "react-router";

const Overlay = () => {
  const overlayRef = useRef();
  let navigate = useNavigate();

  const { isEntering, isExiting } = usePageTransitionStore();

  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    if (!isInitializing) {
      setIsInitializing(true);
      return;
    }

    if (isEntering && !isExiting) {
      gsap.set(overlayRef.current, { display: "block", opacity: 0 });
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 1,
      });
    }

    if (isExiting && !isEntering) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.9,
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
        },
      });
    }
  }, [isEntering, isExiting]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div onClick={handleClick} ref={overlayRef} className="overlay"></div>
    </>
  );
};

export default Overlay;