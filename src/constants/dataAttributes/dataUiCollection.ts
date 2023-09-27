import { DataUiAttribute } from "./dataUiAttribute";

export enum DataUiCollection {
  Article = "Article",
}

export const getDataUiCollection = (collection: DataUiCollection) => ({
  [DataUiAttribute.Collection]: collection,
});
