import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AccessToken } from "../../schemas/accessTokenSchema";

export type User = {
  readonly accessToken: AccessToken;
  readonly name: string;
};

const initialState = null as User | null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (_state, action: PayloadAction<User>) => action.payload,
    userLoggedOut: () => null,
  },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
