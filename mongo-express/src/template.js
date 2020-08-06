const express = require("express");
const router = express.Router();

const Template = require("./mongoose").Template;

router.get("/templates", (req, res) => {
  Template.find((err, templates) => {
    if (err) {
      return res.status(500).send({ error: "Server error" });
    }
    res.send(templates);
  });
});

// Создание шаблона
router.post("/api/template", function (req, res) {
  const template = new Template(req.body);

  template.save((err) => {
    if (err) {
      if (err.name === "ValidationError") {
        return res.status(400).send({ error: "Validation error" });
      } else {
        return res.status(500).send({ error: "Server error" });
      }
    }

    res.status(200).send(template);
  });
});

// Add user to a template
router.patch("/api/template", function (req, res) {
  Template.findByIdAndUpdate(
    req.body.templateId,
    { $addToSet: { users: req.body.userId } },
    { new: true },
    (err, template) => {
      if (err) {
        return res.status(500).send({ error: "Server error" });
      }
      if (!template) {
        return res.status(404).send({ error: "No such template ID" });
      }
      res.status(200).send(template);
    }
  );
});

// Add user to a template
router.delete("/api/template", function (req, res) {
  Template.findByIdAndDelete(req.body.id, (err, template) => {
    if (err) {
      return res.status(500).send({ error: "Server error" });
    }
    if (!template) {
      return res.status(404).send({ error: "No such template ID" });
    }
    res.status(200).send(template);
  });
});

module.exports = router;
