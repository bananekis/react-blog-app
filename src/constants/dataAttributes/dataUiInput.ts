import { DataUiAttribute } from "./dataUiAttribute";

export enum DataUiInput {
  Username = "Username",
  Password = "Password",
  Title = "Title",
  Perex = "Perex",
  Content = "Content",
  Image = "Image",
}

export const getDataUiInput = (input: DataUiInput) => ({
  [DataUiAttribute.Input]: input,
});
