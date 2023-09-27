import { DataUiAttribute } from "./dataUiAttribute";
import { getDataUiObjectName } from "./dataUiObject";

export enum DataUiElement {
  NavLink = "NavLink",
  Submit = "Submit",
}

export const getDataUiElement = (element: DataUiElement) => ({
  [DataUiAttribute.Element]: element,
});

export enum DataUiNavElement {
  Articles = "Articles",
  MyArticles = "MyArticles",
  NewArticle = "NewArticle",
}

export const getDataUiNavElement = (navElement: DataUiNavElement) => ({
  ...getDataUiElement(DataUiElement.NavLink),
  ...getDataUiObjectName(navElement),
});
