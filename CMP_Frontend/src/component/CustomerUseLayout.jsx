// src/component/CustomerUserLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { CusterHeader } from "./CusterHeader"; // Optional
import { Footer } from "./Footer"; // Optional
import { QuizPageHeader } from "./QuizPageHeader";

export const CustomerUserLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <QuizPageHeader />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
