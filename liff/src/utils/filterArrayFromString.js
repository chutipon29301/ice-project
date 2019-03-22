const filterArrayFromString = (arr, str) => {
  const strToLowerCase = str
    .toLowerCase()
    .trim()
    .replace(/ /g, "");
  return arr.filter(element => {
    const values = Object.values(element);
    for (let i = 0; i < values.length; i++) {
      let toStr = values[i]
        .toString()
        .toLowerCase()
        .trim()
        .replace(/ /g, "");
      if (toStr.search(strToLowerCase) !== -1) {
        return true;
      }
    }
    return false;
  });
};

export default filterArrayFromString;
