export const updateArrayElement = <T>(
  array: ReadonlyArray<T>,
  predicate: (element: T, index: number) => boolean,
  updater: (element: T, index: number) => T,
): T[] => {
  return array.map((element, index) =>
    predicate(element, index) ? updater(element, index) : element,
  );
};
