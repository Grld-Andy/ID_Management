const filterUpdateRequestObj = <T extends Record<string, any>>(
  obj: T,
  ...allowedFields: string[]
): Partial<T> => {
  const newObj: Partial<T> = {};
  Object.keys(obj).forEach((field) => {
    if (allowedFields.includes(field)) {
      newObj[field as keyof T] = obj[field];
    }
  });
  return newObj;
};

export default filterUpdateRequestObj;
