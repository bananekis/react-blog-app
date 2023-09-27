import { test, expect } from "@playwright/test";
import { baseUrl, imageFile } from "./helpers/constants";
import {
  actionLocator,
  collectionLocator,
  inputLocator,
  navElementLocator,
} from "./helpers/locators";
import { DataUiNavElement } from "../src/constants/dataAttributes/dataUiElement";
import { DataUiInput } from "../src/constants/dataAttributes/dataUiInput";
import { DataUiAction } from "../src/constants/dataAttributes/dataUiAction";
import { DataUiCollection } from "../src/constants/dataAttributes/dataUiCollection";
import path from "path";

test("can create an article", async ({ page }) => {
  await page.goto(baseUrl);

  const newArticle = page.locator(navElementLocator(DataUiNavElement.NewArticle));
  await newArticle.click();

  const title = page.locator(inputLocator(DataUiInput.Title));
  await title.fill("Test article");

  const perex = page.locator(inputLocator(DataUiInput.Perex));
  await perex.fill("test perex");

  const image = page.locator(inputLocator(DataUiInput.Image));
  await image.setInputFiles(path.join(__dirname, imageFile));

  const content = page.locator(inputLocator(DataUiInput.Content));
  await content.fill("My **Markdown** content");

  const publish = page.locator(actionLocator(DataUiAction.Publish));
  await publish.click();

  const articlesList = page.locator(collectionLocator(DataUiCollection.Article));
  await expect(articlesList).toBeVisible();
});
