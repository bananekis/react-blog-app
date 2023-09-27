import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import IconArrowLeft from "../icons/IconArrowLeft";
import IconLogo from "../icons/IconLogo";
import { useUserLogin } from "../hooks/useUserLogin";
import { DataUiNavElement, getDataUiNavElement } from "../constants/dataAttributes/dataUiElement";
import { DataUiAction, getDataUiAction } from "../constants/dataAttributes/dataUiAction";

export const Navbar: FC = () => {
  const isLoggedIn = useAppSelector((s) => !!s.user);

  const { logoutUser } = useUserLogin();

  return (
    <nav className="flex items-center justify-between bg-gray md:px-56 px-3 w-full sticky top-0">
      <NavLink
        to="/articles"
        {...getDataUiNavElement(DataUiNavElement.Articles)}
        className="flex gap-8 items-center"
      >
        <IconLogo className="py-1 inline" />
        <p className="text-gray-200 inline">Recent Articles</p>
      </NavLink>
      <div className="flex gap-10">
        {isLoggedIn ? (
          <>
            <NavLink to="/my-articles" {...getDataUiNavElement(DataUiNavElement.MyArticles)}>
              My Articles
            </NavLink>
            <NavLink
              to="/my-articles/new"
              className="text-blue"
              {...getDataUiNavElement(DataUiNavElement.NewArticle)}
            >
              Create Article
            </NavLink>
            <button
              onClick={logoutUser}
              className="text-red"
              {...getDataUiAction(DataUiAction.Logout)}
            >
              Log out
            </button>
          </>
        ) : (
          <NavLink to="/login" className="text-blue flex" {...getDataUiAction(DataUiAction.Login)}>
            Log in
            <IconArrowLeft />
          </NavLink>
        )}
      </div>
    </nav>
  );
};

Navbar.displayName = "Navbar";
