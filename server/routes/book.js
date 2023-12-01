const express = require("express");
const router = express.Router();
require("dotenv").config();

const { searchBook } = require("./bookUtil/searchBook.js");

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

module.exports = router;
