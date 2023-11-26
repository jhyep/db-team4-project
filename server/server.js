const oracledb = require("oracledb");
const dbConfig = require("./dbConfig.js");
oracledb.autoCommit = true;

const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const port = 5173;
const bodyParser = require("body-parser");

app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
  }),
);

const connectionConfig = {
  user: dbConfig.user,
  password: dbConfig.password,
  connectString: dbConfig.connectString,
};

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.post("/login", async function (req, res) {
  console.log("login");
  const userid = req.body.userid;
  const password = req.body.password;
  console.log("userid:", userid, "password:", password);
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
          message: "incorrect password",
        });
      }
    } else {
      res.json({
        state: false,
        message: "login failed",
      });
    }
  } catch (err) {
    console.error("Error login: ", err);
  }
});

app.post("/signup", async function (req, res) {
  console.log("signup");
  const userid = req.body.userid;
  const password = req.body.password;
  const username = req.body.username;
  console.log("userid:", userid, "password:", password, "username:", username);
  let result;
  try {
    result = await checkDupId(userid);
    if (result.rows.length > 0) {
      res.json({
        state: false,
        message: "중복된 ID",
      });
    } else {
      result = await createUser(userid, password, username);
      if (result.rowsAffected > 0) {
        console.log("회원가입 성공");
        res.json({
          state: true,
          message: "회원가입 성공",
        });
      } else {
        console.log("회원가입 실패");
        res.json({
          state: false,
          message: "회원가입 실패",
        });
      }
    }
  } catch (err) {
    console.log("Error singup ", err);
  }
});

app.post("/logout", function (req, res) {
  console.log("logout");
  req.session.destroy();
  res.end();
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
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
    console.error("Error login: ", err);
    return null;
  } finally {
    if (connection) {
      try {
        connection.close();
      } catch (err) {
        console.error(err);
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
    console.error("Error signup: ", err);
    return null;
  } finally {
    if (connection) {
      try {
        connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
