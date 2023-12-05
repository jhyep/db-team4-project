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

async function dbGetCustomReads(requestData) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    console.log(requestData.searchType);
    switch (requestData.searchType) {
      case 0:
        sql =
          "select b.title, b.isbn13 from book b, reads r where b.isbn13 = r.isbn13 and r.user_id = :userid and b.title like :title";
        binds = {
          userid: requestData.userId,
          title: "%" + requestData.searchWord + "%",
        };
        break;
      case 1:
        sql =
          "select b.title, b.isbn13 from book b, reads r where b.isbn13 = r.isbn13 and r.user_id = :userid and b.isbn13=:isbn13";
        binds = {
          userid: requestData.userId,
          isbn13: requestData.searchWord,
        };
        break;
      case 2:
        sql =
          "select b.title, b.isbn13 from book b, reads r, author a, writes w where b.isbn13 = r.isbn13 and b.isbn13 = w.isbn13 and w.author_id = a.author_id and r.user_id = :userid and a.author_name like :author_name";
        binds = {
          userid: requestData.userId,
          author_name: "%" + requestData.searchWord + "%",
        };
        break;
      case 3:
        sql =
          "select b.title, b.isbn13 from book b, reads r where b.isbn13 = r.isbn13 and r.user_id = :userid and b.publisher like :publisher";
        binds = {
          userid: requestData.userId,
          publisher: "%" + requestData.searchWord + "%",
        };
        break;
      case 4:
        sql =
          "select b.title, b.isbn13 from book b, reads r, series s where b.isbn13 = r.isbn13 and b.series_id = s.series_id and r.user_id = :userid and s.series_name like :series_name";
        binds = {
          userid: requestData.userId,
          series_name: "%" + requestData.searchWord + "%",
        };
        break;
      case 5:
        let baseRate, endRate;
        if (requestData.baseRate > requestData.endRate) {
          endRate = requestData.baseRate;
          baseRate = requestData.endRate;
        } else {
          baseRate = requestData.baseRate;
          endRate = requestData.endRate;
        }
        sql =
          "select b.title, b.isbn13 from book b, rating t where b.isbn13 = t.isbn13 and t.user_id = :userid and t.rating between :baseRate and :endRate";
        binds = {
          userid: requestData.userId,
          baseRate: baseRate,
          endRate: endRate,
        };
        break;
      case 6:
        sql =
          "select b.title, b.isbn13 from book b, rating t where b.isbn13 = t.isbn13 and t.user_id = :userid and t.rating = :baseRate";
        binds = {
          userid: requestData.userId,
          baseRate: requestData.baseRate,
        };
        break;
      case 7:
        sql =
          "select b.title, b.isbn13 from book b, reads r, category c, has h where b.isbn13 = r.isbn13 and b.isbn13 = h.isbn13 and h.category_id = c.category_id and r.user_id = :userid and c.category_name like :category_name";
        binds = {
          userid: requestData.userId,
          category_name: "%" + requestData.searchWord + "%",
        };
        break;
      default:
        return null;
    }
    if (requestData.isSorted == true) {
      sql =
        sql +
        " ORDER BY ( SELECT AVG(r.rating) FROM rating r WHERE r.isbn13 = b.isbn13 ) DESC";
    }
    console.log(sql);

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
  dbBookDelete,
  dbGetReads,
  dbGetCustomReads,
};
