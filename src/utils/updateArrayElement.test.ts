import { updateArrayElement } from "./updateArrayElement";

describe("updateArrayElement", () => {
  test("updates element based on a predicate", () => {
    const originalArray = [0, 2, 4];
    const updatedArray = updateArrayElement(
      originalArray,
      (_, i) => i === 1,
      (number) => number + 1,
    );

    expect(updatedArray).toStrictEqual([0, 3, 4]);
  });
});
