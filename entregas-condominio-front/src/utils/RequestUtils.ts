export const getMergedParamsFromObject = (obj: object) => {
  return Object.entries(obj)
    .filter(
      (it) =>
        it[1] !== undefined &&
        it[1] !== null &&
        it[1] !== '' &&
        (!Array.isArray(it[1]) || it[1].length)
    )
    .map((it) => {
      return `${it[0]}=${it[1]}`;
    })
    .join('&');
};

export const objectKeysFiltered = <Type>(
  obj: object,
  keysToExclude: string[]
): Type => {
  const p = { ...obj } as any;
  for (let k of keysToExclude) {
    delete p[k];
  }
  return p as Type;
};
