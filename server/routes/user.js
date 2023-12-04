const express = require("express");
const router = express.Router();
const { login } = require("./userUtil/login.js");
const { signup } = require("./userUtil/signup.js");
const { userDelete } = require("./userUtil/delete.js");
const { update } = require("./userUtil/update.js");

router.post("/login", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await login(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while login process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for login api: ", err);
  }
});

router.post("/signup", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await signup(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while signup process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for signup api: ", err);
  }
});

router.post("/delete", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await userDelete(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while delete process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for delete api: ", err);
  }
});

router.post("/update", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await update(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while update process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for update api: ", err);
  }
});

module.exports = router;
