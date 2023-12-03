const oracledb = require("oracledb");
const dbConfig = require("./dbConfig.js");
oracledb.autoCommit = true;

const connectionConfig = {
  user: dbConfig.user,
  password: dbConfig.password,
  connectString: dbConfig.connectString,
};

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

async function getRate(isbn13) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    sql = "select * from rating where isbn13 = :isbn13";
    binds = { isbn13 };
    result = await connection.execute(sql, binds);

    const rateSet = [];

    for (const rate of result.rows) {
      rateSet.push({
        userId: rate[3],
        rating: rate[1],
        comment: rate[2],
      });
    }

    return rateSet;
  } catch (err) {
    console.error("getReview Error: ", err);
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

module.exports = { checkDupId, createUser, getRate };
