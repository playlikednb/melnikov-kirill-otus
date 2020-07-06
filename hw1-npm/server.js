const data = {
  name: 1,
  items: [
    {
      name: 2,
      items: [{ name: 3 }, { name: 4 }],
    },
    {
      name: 5,
      items: [{ name: 6 }],
    },
  ],
};

const showElement = (name, position) => {
  let structureLine = "";
  if (position > 1) {
    const space = "\xa0";
    structureLine =
      position === 2 ? "├──" : `│${space.repeat(position - 2)}└──`;
  }
  console.log(structureLine + name);
};

const processArr = (arr, level) => {
    if (arr[0]) {
        arr.forEach(({name, items}) => {
            showElement(name, level);
            if (items && items[0]) {
                processArr(items, level + 1);
            }
        });
    }
}

const makeStructure = (data) => {
    showElement(data.name, 1);
    if (data.items && data.items[0]) {
        processArr(data.items, 2);
    }
};

makeStructure(data);
