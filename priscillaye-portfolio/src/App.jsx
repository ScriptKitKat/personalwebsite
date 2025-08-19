import "./App.scss"
import React, { useEffect } from "react";
import Experience from "./Experience/Experience";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import { useResponsiveStore } from "./stores/useResponsiveStore";

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
            <Experience />
        </>
    );
}
export default App;