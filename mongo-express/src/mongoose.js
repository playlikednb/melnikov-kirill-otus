const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-express-hw", {
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", (err) => console.error("err.message"));
db.once("open", () => console.info("Connected to MongoDB!"));

const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  fontColor: { type: String, required: true },
  bgColor: { type: String, required: true },
  fontSize: { type: Number, default: 30 },
  users: { type: Array },
});
// #8EC5FC
// #C850C0
// #80D0C7
const UserSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 12 },
  position: { type: String, default: "Unemployed" },
});

const Template = mongoose.model("templates", TemplateSchema);
const User = mongoose.model("users", UserSchema);

module.exports = {
  Template: Template,
  User: User,
  // TODO: add other models here
};
