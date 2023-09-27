import { test, expect } from "@playwright/test";
import { DataUiAction } from "../src/constants/dataAttributes/dataUiAction";
import { actionLocator, elementLocator, inputLocator } from "./helpers/locators";
import { DataUiElement } from "../src/constants/dataAttributes/dataUiElement";
import { baseUrl } from "./helpers/constants";
import { DataUiInput } from "../src/constants/dataAttributes/dataUiInput";

test.use({ storageState: { cookies: [], origins: [] } });

test("cant login with wrong credentials", async ({ page }) => {
  await page.goto(baseUrl);

  const loginAction = page.locator(actionLocator(DataUiAction.Login));
  await loginAction.click();

  const username = page.locator(inputLocator(DataUiInput.Username));
  await username.fill("wrong name");

  const password = page.locator(inputLocator(DataUiInput.Password));
  await password.fill("wrong password");

  const submitButton = page.locator(elementLocator(DataUiElement.Submit));
  await submitButton.click();

  const logoutAction = page.locator(actionLocator(DataUiAction.Logout));
  await expect(logoutAction, "Log out action should not be visible.").not.toBeVisible();
});
