// UserLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const UserLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main >
        <Outlet /> {/* Admin/User routes will render here with padding */}
      </main>
      <Footer />
    </div>
  );
};
