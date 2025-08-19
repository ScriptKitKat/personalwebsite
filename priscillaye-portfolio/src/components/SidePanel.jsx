import React from 'react';
import "./Page.scss";
import { useNavigate } from "react-router";
import gsap from "gsap";

const SidePanel = () => {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };
    return (
        <>
        <div className="overlay"></div>
        <button onClick={handleClick} className={closeButtonClassNames}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.28906 0.875C1.77803 1.30566 1.30522 1.77763 0.873047 2.28711L8.58594 10L0.873047 17.7129C1.30522 18.2224 1.77803 18.6943 2.28906 19.125L10 11.4141L17.7109 19.125C18.222 18.6943 18.6948 18.2224 19.127 17.7129L11.4141 10L19.127 2.28711C18.6948 1.77763 18.222 1.30566 17.7109 0.875L10 8.58594L2.28906 0.875Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className="side-panel">
            <div className="side-panel-wrapper">
                <button className="close-button"></button>
                <div className="side-panel-header"></div>
                <div className="side-panel-content"></div>
            </div>
        </div>
        
        </>
    );
};

export default SidePanel;