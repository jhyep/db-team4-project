const oracledb = require("oracledb");
const dbConfig = require("../dbConfig.js");
oracledb.autoCommit = true;

const connectionConfig = {
  user: dbConfig.user,
  password: dbConfig.password,
  connectString: dbConfig.connectString,
};

async function dbGetReads(userid) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    sql =
      "select b.title, b.isbn13 , b.author from book b, reads r where b.isbn13 = r.isbn13 and r.user_id = :userid";
    binds = { userid };
    options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
    result = await connection.execute(sql, binds, options);

    return result;
  } catch (err) {
    console.error("Reads Error: ", err);
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
  dbGetReads,
};
