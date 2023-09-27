type Serializer<T> = (value: T) => string;
type Deserializer<T> = (rawValue: string) => T;

type Params<T> = {
  readonly key: string;
  readonly serializer?: Serializer<T>;
  readonly deserializer?: Deserializer<T>;
};

export const createLocalStorage = <T>({
  key,
  serializer = JSON.stringify,
  deserializer = JSON.parse,
}: Params<T>) => ({
  load: (): T | null => {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return null;
    }

    try {
      return deserializer(rawValue);
    } catch {
      return null;
    }
  },

  save: (value: T): void => {
    const rawValue = serializer(value);

    localStorage.setItem(key, rawValue);
  },
});
