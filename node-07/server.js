const express = require("express");
const app = express();

data = [{ id: 1, name: "Ivan", age: 15 }];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
  res.send(`Hello ${req.query.name}!`);
});

app.get("/hello/(:id)?", (req, res) => {
  res.send(`Hello ${req.params.id}!`);
});

app.get("/json", (req, res) => {
  res.json({ name: "Kirill" });
});

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

app.get("/file", (req, res) => {
  res.sendFile("index.html", { root: "." });
});


app.get("/person/create", (req, res) => {
    const { name, age } = req.query;
    const newPerson = {
      id: data.length,
      name,
      age,
    };
    data.push(newPerson);
    res.json(newPerson);
  });

app.get("/person/:index", (req, res) => {
  res.json(data[req.params.index - 1]);
});

app.listen(3000, () => console.log("Hello from 3000"));
