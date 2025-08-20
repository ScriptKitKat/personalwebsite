import React from "react";
import AboutPage from "../pages/AboutPage/AboutPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import WorkPage from "../pages/WorkPage/WorkPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import HomePage from "../pages/HomePage/HomePage";
import { Route, Routes } from "react-router";

const Router = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <HomePage />
                }
            />
            <Route
                path="about"
                element={
                    <AboutPage />
                }
            />
            <Route
                path="work"
                element={
                    <WorkPage />
                }
            />
            <Route
                path="contact"
                element={
                    <ContactPage />
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
    };

    export default Router;