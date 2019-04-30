const filterArrayFromString = (arr, str) => {
  const strToLowerCase = str
    .toLowerCase()
    .trim()
    .replace(/ /g, "");
  return arr.filter(element => {
    const entries = Object.entries(element);
    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][0];
      if (key === "description") {
        let toStr = entries[i][1]
          .toString()
          .toLowerCase()
          .trim()
          .replace(/ /g, "");
        if (toStr.search(strToLowerCase) !== -1) {
          return true;
        }
      }
    }
    return false;
  });
};

export default filterArrayFromString;
