import { FC, ReactNode } from "react";
import { LoginLocationState } from "../pages/Login";
import { useAppSelector } from "../hooks/redux";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  readonly children: ReactNode;
};

export const EnsureLogin: FC<Props> = ({ children }) => {
  const isLoggedIn = useAppSelector((s) => !!s.user);
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ path: location.pathname } satisfies LoginLocationState}
      />
    );
  }

  return <>{children}</>;
};

EnsureLogin.displayName = "EnsureLogin";
