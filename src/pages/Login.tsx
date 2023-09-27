import { BaseSyntheticEvent, FC, useEffect, useState } from "react";
import { UserCredentialsServerModel } from "../utils/apiClient";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserLogin as useUserLogin } from "../hooks/useUserLogin";
import { useAppSelector } from "../hooks/redux";
import { DataUiElement, getDataUiElement } from "../constants/dataAttributes/dataUiElement";
import { DataUiInput, getDataUiInput } from "../constants/dataAttributes/dataUiInput";

const disabledSubmitTitle = "Fill username and password to log in.";

export type LoginLocationState = {
  readonly path: string;
};

export const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const changeUsername = (e: BaseSyntheticEvent): void => {
    setUsername(e.currentTarget.value);
    setErrorMessage("");
  };

  const changePassword = (e: BaseSyntheticEvent): void => {
    setPassword(e.currentTarget.value);
    setErrorMessage("");
  };

  const navigate = useNavigate();
  const state = useLocation().state as LoginLocationState;

  const isLoggedIn = useAppSelector((s) => !!s.user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const { loginUser } = useUserLogin();

  const submit = async (e: BaseSyntheticEvent): Promise<void> => {
    e.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    const credentials: UserCredentialsServerModel = {
      username,
      password,
    };

    try {
      await loginUser(credentials);
      navigate(state?.path ?? "/my-articles");
    } catch {
      setErrorMessage("Invalid username or password.");
    }
  };

  const isSubmitDisabled = !username || !password;

  if (isLoggedIn) {
    return null;
  }

  return (
    <form
      onSubmit={submit}
      className="w-[368px] m-auto shadow-level1 p-8 rounded-lg grid gap-6 absolute inset-x-0"
    >
      <h3 className="text-h3">Log In</h3>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            placeholder="Username"
            className="block w-full outline-none px-3 py-[6px] border-gray-50 border rounded-[4px]"
            value={username}
            onChange={changeUsername}
            {...getDataUiInput(DataUiInput.Username)}
          />
          {errorMessage && <strong>{errorMessage}</strong>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="block w-full outline-none px-3 py-[6px] border-gray-50 border rounded-[4px]"
            id="password"
            placeholder="**********"
            type="password"
            value={password}
            onChange={changePassword}
            {...getDataUiInput(DataUiInput.Password)}
          />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <button
          type="submit"
          className="py-[6px] px-3 text-white bg-blue-button rounded-[4px] cursor-pointer disabled:bg-gray disabled:cursor-default"
          disabled={isSubmitDisabled}
          title={isSubmitDisabled ? disabledSubmitTitle : undefined}
          {...getDataUiElement(DataUiElement.Submit)}
        >
          Log In
        </button>
      </div>
    </form>
  );
};

Login.displayName = "Login";
