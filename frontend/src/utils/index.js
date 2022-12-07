export const generateSubStr = (id, length) => id.substr(0, length);

export const checkAllObjectIsNullOfArray = (array) => {
  if (!array.length) {
    return true;
  }

  for (const obj of array) {
    for (const key in obj) {
      if (!obj[key]) {
        return true;
      }
    }
  }

  return false;
};
