const oracledb = require("oracledb");
const dbConfig = require("../dbConfig.js");
oracledb.autoCommit = true;

const connectionConfig = {
  user: dbConfig.user,
  password: dbConfig.password,
  connectString: dbConfig.connectString,
};

async function dbBookDelete(isbn13) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    sql = "delete from book where isbn13 = :isbn13";
    binds = { isbn13 };
    result = await connection.execute(sql, binds);

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

module.exports = {
  dbBookDelete,
};
