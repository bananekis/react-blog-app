import { DataUiAttribute } from "./dataUiAttribute";

export const getDataUiObjectName = (name: string) => ({
  [DataUiAttribute.Object]: name,
});
