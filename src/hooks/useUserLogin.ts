import { useCallback } from "react";
import { UserCredentialsServerModel, useApiClient } from "../utils/apiClient";
import { useAppDispatch } from "./redux";
import { accessTokenSchema } from "../schemas/accessTokenSchema";
import { User, userLoggedIn, userLoggedOut } from "../redux/slices/userSlice";
import { userLocalStorage } from "../utils/localStorage/userLocalStorage";

export const useUserLogin = () => {
  const dispatch = useAppDispatch();
  const apiClient = useApiClient();

  const loadUserSession = useCallback(() => {
    const user = userLocalStorage.load();

    if (user) {
      dispatch(userLoggedIn(user));
    }
  }, [dispatch]);

  const loginUser = useCallback(
    async (credentials: UserCredentialsServerModel) => {
      const accessTokenServerModel = await apiClient.logIn(credentials);
      const accessToken = accessTokenSchema.parse(accessTokenServerModel);

      const user: User = {
        accessToken,
        name: credentials.username,
      };

      dispatch(userLoggedIn(user));
      userLocalStorage.save(user);
    },
    [apiClient, dispatch],
  );

  const logoutUser = useCallback(() => {
    dispatch(userLoggedOut());
    userLocalStorage.save(null);
  }, [dispatch]);

  return {
    loadUserSession,
    loginUser,
    logoutUser,
  };
};
