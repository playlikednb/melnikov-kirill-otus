const express = require("express");
const router = express.Router();

const User = require("./mongoose").User;
const Template = require("./mongoose").Template;

router.use("/account", (req, res, next) => {
  // home:work
  if (req.header("Authorization") === "Basic aG9tZTp3b3Jr") {
    return next();
  }

  res.header("WWW-Authenticate", "Basic");
  res.sendStatus(401);
});

router.get("/account", (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(500).send({ error: "Server error" });
    }
    res.send(users);
  });
});

// Отображение страницы для клиента
router.get("/account/:id", function (req, res) {
  // 5f2c37f00dc80d5650574c2c
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send({ error: "Server error" });
    }
    if (!user) {
      return res.status(404).send({ error: "Not found" });
    }

    Template.findOne(
      //   { _id: "5f2c46b7c66a9d5982f9c72a" },
      { users: req.params.id },
      (err, userTemplate) => {
        if (err) {
          return res.status(500).send({ error: "Server error" });
        }
        if (!userTemplate) {
          return res.status(200).send("No template for this user");
        }

        const answer = user + "\n" + userTemplate;

        res.status(200).render("index", { user, userTemplate });
      }
    );
  });
});

router.post("/api/user", function (req, res) {
  const user = new User(req.body);

  user.save((err) => {
    if (err) {
      if (err.name === "ValidationError") {
        return res.status(400).send({ error: "Validation error" });
      } else {
        return res.status(500).send({ error: "Server error" });
      }
    }

    res.status(200).send(user);
  });
});

module.exports = router;
