import { DataUiAction, getDataUiAction } from "../../src/constants/dataAttributes/dataUiAction";
import {
  DataUiCollection,
  getDataUiCollection,
} from "../../src/constants/dataAttributes/dataUiCollection";
import {
  DataUiElement,
  DataUiNavElement,
  getDataUiElement,
  getDataUiNavElement,
} from "../../src/constants/dataAttributes/dataUiElement";
import { DataUiInput, getDataUiInput } from "../../src/constants/dataAttributes/dataUiInput";

export const attributesLocator = (attributes: object): string => {
  return Object.entries(attributes).reduce<string>(
    (locator, [attribute, value]) => `${locator}[${attribute}='${value}']`,
    "",
  );
};

export const actionLocator = (action: DataUiAction): string =>
  attributesLocator(getDataUiAction(action));

export const elementLocator = (element: DataUiElement): string =>
  attributesLocator(getDataUiElement(element));

export const navElementLocator = (navElement: DataUiNavElement): string =>
  attributesLocator(getDataUiNavElement(navElement));

export const inputLocator = (input: DataUiInput): string =>
  attributesLocator(getDataUiInput(input));

export const collectionLocator = (collection: DataUiCollection): string =>
  attributesLocator(getDataUiCollection(collection));
