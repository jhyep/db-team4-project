const oracledb = require("oracledb");
const dbConfig = require("./dbConfig.js");
oracledb.autoCommit = true;

const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const port = 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
  })
);

const connectionConfig = {
  user: dbConfig.user,
  password: dbConfig.password,
  connectString: dbConfig.connectString,
};

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/api/login", async function (req, res) {
  const userid = req.body.userid;
  const password = req.body.password;
  try {
    const result = await checkDupId(userid);

    if (result.rows.length > 0) {
      if (password == result.rows[0].PASSWORD) {
        req.session.is_logined = true;
        req.session.userid = userid;
        req.session.save(function () {
          res.json({
            state: true,
            message: "login success",
          });
        });
      } else {
        res.json({
          state: false,
          cause: "password",
          message: "incorrect password",
        });
      }
    } else {
      res.json({
        state: false,
        cause: "userid",
        message: "login failed",
      });
    }
  } catch (err) {
    console.error("LogIn Error: ", err);
  }
});

app.post("/api/signup", async function (req, res) {
  const userid = req.body.userid;
  const password = req.body.password;
  const username = req.body.username;
  let result;
  try {
    result = await checkDupId(userid);
    if (result.rows.length > 0) {
      res.json({
        state: false,
        cause: "userid",
        message: "중복된 ID",
      });
    } else {
      result = await createUser(userid, password, username);
      if (result.rowsAffected > 0) {
        res.json({
          state: true,
          message: "회원가입 성공",
        });
      } else {
        res.json({
          state: false,
          cause: "error",
          message: "회원가입 실패",
        });
      }
    }
  } catch (err) {
    console.error("SignUp Error: ", err);
  }
});

app.post("/logout", function (req, res) {
  req.session.destroy();
  res.end();
});

app.post("/api/search", async (req, res) => {
  const requestData = req.body;
  const aladinSearchUrl =
    "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?MaxResults=100&output=js&Version=20131101&CategoryId=0";

  if (requestData) {
    try {
      const searchResult = [];
      let page = 1;
      do {
        aladinResponse = await axios.get(aladinSearchUrl, {
          params: {
            Query: requestData.query,
            QueryType: requestData.queryType,
            Sort: requestData.sort,
            RecentPublishFilter: requestData.recentPublishFilter,
            Start: page,
            ttbkey: process.env.ALADIN_API_KEY,
          },
        });

        for (const item of aladinResponse.data.item) {
          const searchItem = {
            title: item.title,
            author: item.author,
            pubDate: item.pubDate,
            isbn13: item.isbn13 ? item.isbn13 : await isbn10to13(item.isbn),
            categoryName: item.categoryName,
            publisher: item.publisher,
            seriesName: item.seriesInfo ? item.seriesInfo.seriesName : "",
          };
          searchResult.push(searchItem);
        }

        page++;
      } while (
        aladinResponse.data.totalResults / aladinResponse.data.itemsPerPage >
        aladinResponse.data.startIndex
      );

      res.send(searchResult);
    } catch (err) {
      console.log("aladin API request err: ", err);
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(port, function () {
  console.log(`listening on ${port}`);
});

async function checkDupId(userid) {
  let connection, sql, binds, options, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    sql = "select * from web_user where user_id = :userid";
    binds = { userid };
    options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
    result = await connection.execute(sql, binds, options);

    return result;
  } catch (err) {
    console.error("LogIn Error: ", err);
    return null;
  } finally {
    if (connection) {
      try {
        connection.close();
      } catch (err) {
        console.error("Connection Close Error: ", err);
      }
    }
  }
}

async function createUser(userid, password, username) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    sql =
      "insert into web_user (user_id, password, name) values (:userid, :password, :username)";
    binds = { userid, password, username };
    result = await connection.execute(sql, binds);

    return result;
  } catch (err) {
    console.error("SignUp Error: ", err);
    return null;
  } finally {
    if (connection) {
      try {
        connection.close();
      } catch (err) {
        console.error("Connection Close Error: ", err);
      }
    }
  }
}

async function isbn10to13(isbn10) {
  const isbn12 = "978" + isbn10.substring(0, 9);

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(isbn12[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  const isbn13 = isbn12 + checkDigit;

  return isbn13;
}
