import { test as setup, expect } from "@playwright/test";
import { authFile, baseUrl, testUser } from "./helpers/constants";
import { actionLocator, elementLocator, inputLocator } from "./helpers/locators";
import { DataUiAction } from "../src/constants/dataAttributes/dataUiAction";
import { DataUiElement } from "../src/constants/dataAttributes/dataUiElement";
import { DataUiInput } from "../src/constants/dataAttributes/dataUiInput";

setup("authenticate", async ({ page }) => {
  await page.goto(baseUrl);

  const loginAction = page.locator(actionLocator(DataUiAction.Login));
  await loginAction.click();

  const username = page.locator(inputLocator(DataUiInput.Username));
  await username.fill(testUser.name);

  const password = page.locator(inputLocator(DataUiInput.Password));
  await password.fill(testUser.password);

  const submitButton = page.locator(elementLocator(DataUiElement.Submit));
  await submitButton.click();

  const logoutAction = page.locator(actionLocator(DataUiAction.Logout));
  await expect(logoutAction, "Found log out action.").toBeVisible();

  await page.context().storageState({ path: authFile });
});
