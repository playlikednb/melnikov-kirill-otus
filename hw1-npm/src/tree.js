const showElement = (name, position) => {
  if (!name) return null;

  let structureLine = "";
  if (position > 1) {
    const space = "\xa0";
    structureLine =
      position === 2 ? "├──" : `│${space.repeat(position - 2)}└──`;
  }

  return structureLine + name + "\n";
};

const processArr = (arr, level) => {
  if (!arr[0]) return null;

  let result = "";
  arr.forEach(({ name, items }) => {
    result = result + showElement(name, level);
    if (items && items[0]) {
      result = result + processArr(items, level + 1);
    }
  });

  return result;
};

const makeStructure = (data) => {
  if (!data) return null;

  let result = showElement(data.name, 1);
  if (data.items && data.items[0]) {
    result = result + processArr(data.items, 2);
  }

  return result;
};

module.exports = { showElement, processArr, makeStructure };
