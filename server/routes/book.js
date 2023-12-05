const express = require("express");
const router = express.Router();
require("dotenv").config();

const { searchBook } = require("./bookUtil/searchBook.js");
const { readBook } = require("./bookUtil/readBook.js");
const { deleteBook } = require("./bookUtil/deleteBook.js");
const { getReads } = require("./bookUtil/getReads.js");
const { infoBook } = require("./bookUtil/infoBook.js");
const { getRate } = require("./dbUtil/dbBookUtils/dbBookUtils.js");
const { writeComment } = require("./bookUtil/writeComment.js");
const { writeReview } = require("./bookUtil/writeReview.js");
const { loadReview } = require("./bookUtil/loadReview.js");

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

router.post("/read", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const searchResult = await readBook(requestData);
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

router.post("/getReads", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const searchResult = await getReads(requestData);
      res.send(searchResult);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while load process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for load api: ", err);
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

router.post("/writeComment", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const searchResult = await writeComment(requestData);
      res.send(searchResult);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while rate process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for ratebook api: ", err);
  }
});

router.post("/writeReview", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const searchResult = await writeReview(requestData);
      res.send(searchResult);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while review process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for review api: ", err);
  }
});

router.post("/loadReview", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const searchResult = await loadReview(requestData);
      res.send(searchResult);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while LoadReview process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for LoadReview api: ", err);
  }
});

module.exports = router;
