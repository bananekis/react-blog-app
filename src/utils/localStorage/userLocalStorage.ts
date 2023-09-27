import { User } from "../../redux/slices/userSlice";
import { createLocalStorage } from "./createLocalStorage";
import { LocalStorageKey } from "./LocalStorageKey";

export const userLocalStorage = createLocalStorage<User | null>({
  key: LocalStorageKey.AccessToken,
});
