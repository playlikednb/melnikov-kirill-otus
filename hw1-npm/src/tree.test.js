const { showElement, processArr, makeStructure } = require("./tree");

const dataSample = {
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

test("show element in a line", () => {
  const name = "name 1";
  const position = 2;
  expect(showElement(name, position)).not.toBeNull();
});

test("process array for inner structure", () => {
  expect(processArr(dataSample.items, 2)).not.toBeNull();
});

test("make and show structure fn", () => {
  expect(makeStructure(dataSample)).not.toBeNull();
});
