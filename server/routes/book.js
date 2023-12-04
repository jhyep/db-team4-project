const express = require("express");
const router = express.Router();
require("dotenv").config();

const { searchBook } = require("./bookUtil/searchBook.js");
const { deleteBook } = require("./bookUtil/deleteBook.js");
const { getReads } = require("./bookUtil/getReads.js");

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

router.post("/delete", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const searchResult = await deleteBook(requestData);
      res.send(searchResult);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while delete process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for delete api: ", err);
  }
});

router.post("/getReads", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const searchResult = await getReads(requestData);
      res.send(searchResult);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while read process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for read api: ", err);
  }
});

module.exports = router;
