import React, { useLayoutEffect, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import "./Page.scss";
import About from "../components/information/AboutInfo";
import Contact from "../components/information/ContactInfo";
import MyWork from "../components/information/WorkInfo"; // Assuming you have a WorkInfo component

const SidePanel = ({ name }) => {
  const navigate = useNavigate();

  const panelRef = useRef(null);
  const overlayRef = useRef(null);

  // Simple responsive check without global stores
  const isMobile = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false),
    []
  );

  // ENTER animation on mount
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;

    gsap.set(panel, { x: isMobile ? 0 : "100%", y: isMobile ? "100%" : 0, opacity: 0 });
    gsap.set(overlay, { opacity: 0, display: "block" });

    const tl = gsap.timeline();
    tl.to(panel, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    }).to(
      overlay,
      {
        opacity: 0.5, // tweak overlay darkness
        duration: 0.6,
        ease: "power2.out",
      },
      0 // start with panel
    );

    return () => {
      // if the component unmounts unexpectedly, kill timeline
      tl.kill();
    };
  }, [isMobile]);
  const innerWrapperRef = useRef(null);
  const scrollValues = useRef({
    current: 0,
    target: 0,
    ease: 0.15,
  });

  useEffect(() => {
    const scrollContainer = innerWrapperRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      e.preventDefault();
      scrollValues.current.target += e.deltaY;

      const maxScroll =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;
      scrollValues.current.target = Math.max(
        0,
        Math.min(scrollValues.current.target, maxScroll)
      );
    };

    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      scrollValues.current.target += diff * 1.5;
      touchStartY = touchY;

      const maxScroll =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;
      scrollValues.current.target = Math.max(
        0,
        Math.min(scrollValues.current.target, maxScroll)
      );
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    scrollContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    scrollContainer.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    const smoothScroll = () => {
      scrollValues.current.current =
        scrollValues.current.current * (1 - scrollValues.current.ease) +
        scrollValues.current.target * scrollValues.current.ease;

      if (scrollContainer) {
        scrollContainer.scrollTop = scrollValues.current.current;
      }

      requestAnimationFrame(smoothScroll);
    };

    const animationId = requestAnimationFrame(smoothScroll);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  // EXIT animation, then navigate home
  const handleClose = () => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
        navigate("/", { replace: true });
      },
    });

    tl.to(panel, {
      x: isMobile ? 0 : "100%",
      y: isMobile ? "100%" : 0,
      opacity: 0,
      duration: 0.6,
      ease: "power4.in",
    }).to(
      overlay,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      },
      0
    );
  };

  console.log(name);

  return (
    <>
      <div ref={overlayRef} className="overlay" onClick={handleClose} />
      <aside ref={panelRef} className="side-panel">
        <button onClick={handleClose} className="side-panel-close-button" aria-label="Close">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="4" />
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="4" />
          </svg>
        </button>
        <div className="side-panel-wrapper" ref={innerWrapperRef}>
          {
            name === "About" ? <About /> :
            name === "Contact" ? <Contact /> : <MyWork /> // Assuming you have a WorkInfo component
          }
        </div>
      </aside>
    </>
  );
};

export default SidePanel;


{/* {
              name === "About" ? <AboutInfo /> :
              name === "Contact" ? <ContactInfo /> :
              name === "Work" //? <WorkInfo /> :
              //<NotFoundPage />
            } */}