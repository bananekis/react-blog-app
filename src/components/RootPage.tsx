import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export const RootPage = () => {
  return (
    <>
      <Navbar />
      <div className="md:px-56 px-3 my-16">
        <Outlet />
      </div>
    </>
  );
};

RootPage.displayName = "RootPage";
