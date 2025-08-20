import "./App.scss"
import React, { useEffect } from "react";
import Experience from "./Experience/Experience";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import Router from "./routes/Router";
import { useResponsiveStore } from "./stores/useResponsiveStore";
import Overlay from "./components/Overlay";

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
            <Overlay />
            <Router />
            <Experience />
        </>
    );
}
export default App;