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

const { searchBook } = require("./searchBook.js");

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
