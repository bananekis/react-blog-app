import { formatDate, formatTimeAgo } from "./formatDate";

describe("formatDate", () => {
  test("formats the date correctly", () => {
    const timestamp = "2023-09-24T15:39:41.614468";

    const date = formatDate(timestamp);

    expect(date).toEqual("24.09.2023");
  });
});

describe("formatTimeAgo", () => {
  test("formats the Time ago correctly", () => {
    const timestamp = "2023-09-24T15:39:41.614468";

    const date = formatTimeAgo(timestamp);

    expect(date).toEqual("1 day ago");
  });
});
