import { createLocalStorage } from "./createLocalStorage";

type Data = {
  readonly value: number;
};

global.localStorage = {
  state: {},
  setItem(key, item) {
    this.state[key] = item;
  },
  getItem(key: string) {
    return this.state[key] ?? null;
  },
  clear() {
    this.state = {};
  },
  removeItem(key) {
    delete this.state[key];
  },
  key(index) {
    return Object.keys(this.state)[index] || null;
  },
  length: 0,
};

describe("createLocalStorage", () => {
  test("works with local storage correctly using serializer and deserializer", () => {
    const key = "test-key";
    const serializer = (data: Data): string => data.value.toString();
    const deserializer = (rawValue: string): Data => ({ value: +rawValue });

    const data: Data = {
      value: 5,
    };

    const localStorageManager = createLocalStorage<Data>({
      key,
      serializer,
      deserializer,
    });

    localStorageManager.save(data);
    const deserializedData = localStorageManager.load();

    expect(deserializedData).toStrictEqual(data);
  });
});
