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

async function dbBookSave(userid, book) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    if (book.seriesid != 0) {
      sql =
        "insert into series (series_id, series_name) select :seriesid, :seriesname from dual where not exists (select series_id from series where series_id = :seriesid)";
      binds = { seriesid: book.seriesid, seriesname: book.seriesname };
      await connection.execute(sql, binds);
    }
    book.seriesid = book.seriesid === 0 ? null : book.seriesid;

    sql =
      "insert into category (category_id, category_name) select :categoryid, :categoryname from dual where not exists (select category_id from category where category_id = :categoryid)";
    binds = { categoryid: book.categoryid, categoryname: book.categoryname };
    await connection.execute(sql, binds);

    sql =
      "insert into book (title, author, isbn13, pubDate, publisher, num_of_rating, series_Id,  salesPoint) select :title, :author, :isbn13, :pubdate, :publisher, :numofrating, :seriesid, :salespoint from dual where not exists (select isbn13 from book where isbn13 = :isbn13)";
    binds = {
      title: book.title,
      author: book.author,
      isbn13: book.isbn13,
      pubdate: book.pubdate,
      publisher: book.publisher,
      numofrating: book.numofrating,
      seriesid: book.seriesid,
      salespoint: book.salespoint,
    };
    await connection.execute(sql, binds);

    sql =
      "insert into reads (user_id, isbn13) select :userid, :isbn13 from dual where not exists (select isbn13 from reads where user_id = :userid and isbn13 = :isbn13)";
    binds = { userid: userid, isbn13: book.isbn13 };
    result = await connection.execute(sql, binds);

    return result;
  } catch (err) {
    console.error("Save Error: ", err);
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

async function dbWriteReview(userid, isbn13, contents) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    sql =
      "select MAX(review_id) as review_id from review where user_id = :userid";
    binds = { userid };
    result = await connection.execute(sql, binds);
    review_id = result.rows[0][0] + 1;

    sql =
      "MERGE INTO review r USING dual ON (r.isbn13 = :isbn13) WHEN MATCHED THEN UPDATE SET r.contents = :contents WHEN NOT MATCHED THEN INSERT (review_id, contents, user_id, isbn13) VALUES (:review_id, :contents, :userid, :isbn13)";
    binds = { review_id, userid, isbn13, contents };
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

module.exports = {
  dbBookDelete,
  dbBookSave,
  dbGetReads,
  dbWriteReview,
};
