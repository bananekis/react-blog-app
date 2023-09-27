import { DataUiAttribute } from "./dataUiAttribute";

export enum DataUiAction {
  Login = "Login",
  Logout = "Logout",
  Publish = "Publish",
}

export const getDataUiAction = (action: DataUiAction) => ({
  [DataUiAttribute.Action]: action,
});
