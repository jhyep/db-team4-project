const oracledb = require("oracledb");
const dbConfig = require("../dbConfig.js");
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

    sql = "select * from web_user where user_id = :userid";
    binds = { userid };
    options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
    result = await connection.execute(sql, binds, options);

    if (result.rows.length > 0) {
      return { state: false, cause: "userid" };
    }

    sql =
      "insert into web_user (user_id, password, name) values (:userid, :password, :username)";
    binds = { userid, password, username };
    result = await connection.execute(sql, binds);

    if (result.rowsAffected > 0) {
      return { state: true };
    } else {
      return { state: false, casue: "error" };
    }
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

async function dbUserDelete(userid) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    sql = "delete from web_user where user_id = :userid";
    binds = { userid };
    result = await connection.execute(sql, binds);
    await connection.execute("COMMIT");

    return result;
  } catch (err) {
    console.error("Delete Error: ", err);
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

async function updateUser(userid, username, password) {
  let connection, sql, binds, result, change;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    if (!username) {
      sql = "update web_user set password = :password where user_id = :userid";
      binds = { password, userid };
      change = "password";
    } else if (!password) {
      sql = "update web_user set name = :username where user_id = :userid";
      binds = { username, userid };
      change = "name";
    } else {
      sql =
        "update web_user set name = :username, password = :password where user_id = :userid";
      binds = { username, password, userid };
      change = "both";
    }
    result = await connection.execute(sql, binds);
    await connection.execute("COMMIT");

    return { result, change };
  } catch (err) {
    console.error("Update Error: ", err);
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

module.exports = {
  checkDupId,
  createUser,
  dbUserDelete,
  updateUser,
};
