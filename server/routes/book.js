const express = require("express");
const router = express.Router();
require("dotenv").config();

const { searchBook } = require("./bookUtil/searchBook.js");
const { infoBook } = require("./bookUtil/infoBook.js");
const { getRate } = require("./dbUtil/dbUtils.js");

router.post("/search", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const searchResult = await searchBook(requestData);
      res.send(searchResult);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while searching: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for search api: ", err);
  }
});

router.post("/info", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const infoResult = await infoBook(requestData);
      res.send(infoResult);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while get BookInfo: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for search api: ", err);
  }
});

router.post("/rate", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const reviews = await getRate(requestData.itemId);
      res.send(reviews);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while get Reviews: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for search api: ", err);
  }
});

module.exports = router;
