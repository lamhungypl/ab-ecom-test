export const uniqArrayBy = <TData extends Record<string, any>>(
  arr: TData[],
  key: keyof TData & string
) => {
  const hashedList = new Map<string, TData>(
    Object.entries(
      arr.reduce(
        (hash, current) => {
          hash[key] = current;
          return hash;
        },
        {} as Record<string, TData>
      )
    )
  );
  return Array.from(hashedList.values());
};

export const uniqArray = <T extends number | string>(arr: T[]) => {
  const valueSet = new Set(arr);
  return Array.from(valueSet.values());
};

export const alphabeticalSort = (a: string, b: string) => {
  return a.localeCompare(b);
};

export const sortByKeys = <T extends Record<string, any>>(keys: Array<keyof T>) => {
  return (a: T, b: T) => {
    return keys.reduce((acc, key) => {
      return acc || a?.[key]?.localeCompare?.(b?.[key]);
    }, 0);
  };
};

export const narrowArray = <T, U>(value: T[] | U): value is T[] => {
  return Array.isArray(value);
};
