const express = require("express");
const router = express.Router();
require("dotenv").config();

const { searchBook } = require("./bookUtil/searchBook.js");
const { infoBook } = require("./bookUtil/infoBook.js");
const { deleteBook } = require("./bookUtil/deleteBook.js");
const { getReads } = require("./bookUtil/getReads.js");
const { dbGetRate } = require("./dbUtil/dbBookUtils/dbBookUtils.js");
const { dbAddRate } = require("./dbUtil/dbBookUtils/dbBookUtils.js");

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

router.post("/getrate", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const reviews = await dbGetRate(requestData.itemId);
      res.send(reviews);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while get ratings: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for getrate api: ", err);
  }
});

router.post("/addrate", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await dbAddRate(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while add rate: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for addrate api: ", err);
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
