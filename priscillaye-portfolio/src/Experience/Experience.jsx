import React, { useRef, useEffect, useState } from "react";
import Scene from "./Scene";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, PerspectiveCamera} from "@react-three/drei";
import { useResponsiveStore } from "../stores/useResponsiveStore";


const Experience = () => {
    const cameraRef = useRef();

    const { isMobile } = useResponsiveStore();

    const {isExperienceReady} = useResponsiveStore();

    const zoomLevel = isMobile ? 0.65 : 1.1;
    useEffect(() => {
        if (!cameraRef.current) return;
        cameraRef.current.zoom = isMobile ? 0.5 : 1.1;
        cameraRef.current.updateProjectionMatrix();
    }, [isMobile, isExperienceReady]);
    
    return (
        <>
            <Canvas style={{ width: "100%", position: "fixed", zIndex: 1, top: 0, left: 0 }}>
                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault
                    fov={50}
                    aspect={window.innerWidth / window.innerHeight}
                    near={0.1}
                    far={1000}
                    zoom={zoomLevel}
                    rotation={[-0.6382823775569921,0.753860261860816, 0.46985547464570854]}
                    position={[19.718981474444472, 15.60021131689159, 16.899198628288907]}
                />
                <OrbitControls
                    enableDamping={true}
                    dampingFactor={0.05}
                    enableZoom={true}
                    enablePan={true}
                    screenSpacePanning={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={0}
                    minAzimuthAngle={0}
                    maxAzimuthAngle={Math.PI / 2}
                    minDistance={5}
                    maxDistance={45}
                    target={[0, 2, 0]} // set initial target position
                />
                <Scene camera={cameraRef} />
            </Canvas>
        </>
    );
};

export default Experience;