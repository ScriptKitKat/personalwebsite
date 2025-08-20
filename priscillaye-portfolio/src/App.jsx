import "./App.scss"
import React, { useEffect } from "react";
import Experience from "./Experience/Experience";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import Router from "./routes/Router";
import { useResponsiveStore } from "./stores/useResponsiveStore";
import MusicButton from './components/MusicButton';

function App() {

    const {updateDimensions} = useResponsiveStore();

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    });

    return (
        <>
            <LoadingPage />
            <Router />
            <Experience />
            <MusicButton />
        </>
    );
}
export default App;