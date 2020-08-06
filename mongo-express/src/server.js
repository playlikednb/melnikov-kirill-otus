const express = require("express");
const accountRouter = require("./account");
const templateRouter = require("./template");

const app = express();

app.set("view engine", "pug");

app.use(express.json());

app.use(accountRouter);
app.use(templateRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello!");
});

// TODO: add other routes here

app.listen(3000, () => console.log("Express server listening on 3000"));
