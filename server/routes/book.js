const express = require("express");
const router = express.Router();
require("dotenv").config();

const { searchBook } = require("./bookUtil/searchBook.js");
const { infoBook } = require("./bookUtil/infoBook.js");
const { deleteBook } = require("./bookUtil/deleteBook.js");
const { getReads } = require("./bookUtil/getReads.js");
const {
  dbGetRate,
  dbAddRate,
  dbAddReview,
  dbCheckRead,
  dbInsertRead,
  dbDeleteRead,
  dbGetMyRate,
  dbGetMyReview,
} = require("./dbUtil/dbBookUtils/dbBookUtils.js");

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

router.post("/addreview", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await dbAddReview(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while add review: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for addreview api: ", err);
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

router.post("/getmyreview", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await dbGetMyReview(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while checkread process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for getmyreview api: ", err);
  }
});

router.post("/getmyrate", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await dbGetMyRate(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while checkread process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for getmyreview api: ", err);
  }
});

router.post("/checkread", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await dbCheckRead(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while checkread process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for checkread api: ", err);
  }
});

router.post("/insertread", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await dbInsertRead(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while checkread process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for insertread api: ", err);
  }
});

router.post("/deleteread", async function (req, res) {
  const requestData = req.body;

  if (requestData) {
    try {
      const result = await dbDeleteRead(requestData);
      res.send(result);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.error("Internal Server Error while checkread process: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
    console.error("Bad request for deleteread api: ", err);
  }
});

module.exports = router;
