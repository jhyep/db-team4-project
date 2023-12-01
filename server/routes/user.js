const express = require("express");
const router = express.Router();
const { login } = require("./userUtil/login.js");
const { signup } = require("./userUtil/signup.js");

router.post("/login", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await login(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while searching: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for search api: ", err);
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
      console.error("Internal Server Error while searching: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for search api: ", err);
  }
});

module.exports = router;
