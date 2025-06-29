import { Outlet } from "react-router-dom";
import { QuizPageHeader } from "./QuizPageHeader";
import { Footer } from "./Footer";

export const CustomerUserLayout1 = () => {
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
