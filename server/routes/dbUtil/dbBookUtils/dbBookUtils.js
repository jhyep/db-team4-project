const oracledb = require("oracledb");
const dbConfig = require("../dbConfig.js");
oracledb.autoCommit = false;

const connectionConfig = {
  user: dbConfig.user,
  password: dbConfig.password,
  connectString: dbConfig.connectString,
};

async function dbBookInsert(bkInfo) {
  let connection, sql, binds, result;

  try {
    connection = await oracledb.getConnection(connectionConfig);

    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

    // db에 책이 있는지 확인
    sql = "select count(*) from book where isbn13=:isbn13";
    binds = {
      isbn13: bkInfo.isbn13,
    };
    result = await connection.execute(sql, binds);

    // 없으면 책 추가
    if (result.rows[0][0] == 0) {
      if (bkInfo.seriesId) {
        // 시리즈 있는지 확인
        sql = "select count(*) from series where series_id=:series_id";
        binds = {
          series_id: bkInfo.seriesId,
        };
        result = await connection.execute(sql, binds);

        // 없으면 시리즈 추가
        if (result.rows[0][0] == 0) {
          sql = "insert into series values(:series_id, :series_name)";
          binds = {
            series_id: bkInfo.seriesId,
            series_name: bkInfo.seriesName.substring(0, 33),
          };
          result = await connection.execute(sql, binds);
        }
      }

      if (bkInfo.categoryId) {
        // 카테고리 있는지 확인
        sql = "select count(*) from category where category_id=:category_id";
        binds = {
          category_id: bkInfo.categoryId,
        };
        result = await connection.execute(sql, binds);

        // 없으면 카테고리 추가
        if (result.rows[0][0] == 0) {
          sql = "insert into category values(:category_id, :category_name)";
          binds = {
            category_id: bkInfo.categoryId,
            category_name: bkInfo.categoryName.substring(0, 50),
          };
          result = await connection.execute(sql, binds);
        }
      }

      // 작가 있는지 확인
      sql = "select count(*) from author where author_name=:author_name";
      binds = {
        author_name: bkInfo.author.substring(0, 20),
      };
      result = await connection.execute(sql, binds);

      // 없으면 작가 추가
      if (result.rows[0][0] == 0) {
        sql =
          "select author_id from author where rownum <= 1 order by author_id desc";
        result = await connection.execute(sql);

        sql = "insert into author values(:author_id, :author_name)";
        binds = {
          author_id: result.rows[0][0] + 1,
          author_name: bkInfo.author.substring(0, 20),
        };
        result = await connection.execute(sql, binds);
      }

      sql =
        "insert into book values(:title, :author, :isbn13, TO_DATE(:pubDate, 'YYYY-MM-DD'), :publisher, 0, :series_id, 0)";
      binds = {
        title: bkInfo.title.substring(0, 83),
        author: bkInfo.author.substring(0, 20),
        isbn13: bkInfo.isbn13,
        pubDate: bkInfo.pubDate,
        publisher: bkInfo.publisher.substring(0, 20),
        series_id: bkInfo.seriesId,
      };
      await connection.execute(sql, binds);

      // 카테고리와 책 연결
      sql = "insert into has values(:category_id, :isbn13)";
      binds = {
        category_id: bkInfo.categoryId,
        isbn13: bkInfo.isbn13,
      };
      await connection.execute(sql, binds);

      // 작가와 책 연결
      sql = "select author_id from author where author_name=:author_name";
      binds = {
        author_name: bkInfo.author.substring(0, 20),
      };
      result = await connection.execute(sql, binds);

      sql = "insert into writes values(:author_id, :isbn13)";
      binds = {
        author_id: result.rows[0][0],
        isbn13: bkInfo.isbn13,
      };
      await connection.execute(sql, binds);
      await connection.execute("COMMIT");
    }
    await connection.execute("COMMIT");

    return true;
  } catch (err) {
    if (connection) {
      try {
        await connection.execute("ROLLBACK");
        return "INSERT ROLLBACK";
      } catch (rollbackError) {
        console.error("Insert Rollback error:", rollbackError);
      }
    }
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

async function dbBookDelete(isbn13) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    sql = "delete from book where isbn13 = :isbn13";
    binds = { isbn13 };
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

async function dbCheckRead(readsTuple) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    sql =
      "select count(*) from reads where user_id=:user_id and isbn13=:isbn13";
    binds = { user_id: readsTuple.userId, isbn13: readsTuple.isbn13 };
    result = await connection.execute(sql, binds);

    if (result.rows[0][0] == 0) return false;
    else return true;
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

async function dbInsertRead(readsTuple) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

    sql = "insert into reads values(:user_id, :isbn13)";
    binds = { user_id: readsTuple.userId, isbn13: readsTuple.isbn13 };
    result = await connection.execute(sql, binds);
    await connection.execute("COMMIT");

    return result;
  } catch (err) {
    if (connection) {
      try {
        await connection.execute("ROLLBACK");
        return " INSERT READ ROLLBACK";
      } catch (rollbackError) {
        console.error("AddRate Rollback error:", rollbackError);
      }
    }
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

async function dbDeleteRead(readsTuple) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    sql = "delete from reads where user_id=:user_id and isbn13=:isbn13";
    binds = { user_id: readsTuple.userId, isbn13: readsTuple.isbn13 };
    result = await connection.execute(sql, binds);
    await connection.execute("COMMIT");

    return result;
  } catch (err) {
    console.error("dbDeleteRead Error: ", err);
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

async function dbGetRate(isbn13) {
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

async function dbAddRate(ratingTuple) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

    // reads에 있는지 확인
    sql =
      "select count(*) from reads where user_id=:user_id and isbn13=:isbn13";
    binds = {
      user_id: ratingTuple.user_id,
      isbn13: ratingTuple.isbn13,
    };
    result = await connection.execute(sql, binds);

    // 없으면 reads 추가
    if (result.rows[0][0] == 0) {
      sql = "insert into reads values(:user_id, :isbn13)";
      binds = {
        user_id: ratingTuple.user_id,
        isbn13: ratingTuple.isbn13,
      };
      await connection.execute(sql, binds);
    }

    sql =
      "select count(*) from rating where user_id=:user_id and isbn13=:isbn13";
    binds = {
      user_id: ratingTuple.user_id,
      isbn13: ratingTuple.isbn13,
    };
    result = await connection.execute(sql, binds);

    if (result.rows[0][0] == 0) {
      sql =
        "insert into rating values(0, :rating, :contents, :user_id, :isbn13)";
      binds = {
        rating: ratingTuple.rating,
        contents: ratingTuple.contents,
        user_id: ratingTuple.user_id,
        isbn13: ratingTuple.isbn13,
      };
      await connection.execute(sql, binds);
      await connection.execute("COMMIT");

      return "insert";
    } else if (result.rows[0][0] == 1) {
      sql =
        "UPDATE rating SET rating=:rating, contents=:contents WHERE user_id=:user_id and isbn13=:isbn13";
      binds = {
        rating: ratingTuple.rating,
        contents: ratingTuple.contents,
        user_id: ratingTuple.user_id,
        isbn13: ratingTuple.isbn13,
      };
      await connection.execute(sql, binds);
      await connection.execute("COMMIT");

      return "update";
    } else {
      await connection.execute("COMMIT");
      return false;
    }
  } catch (err) {
    if (connection) {
      try {
        await connection.execute("ROLLBACK");
        return " ROLLBACK";
      } catch (rollbackError) {
        console.error("AddRate Rollback error:", rollbackError);
      }
    }
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

async function dbAddReview(reviewTuple) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    await connection.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

    // reads에 있는지 확인
    sql =
      "select count(*) from reads where user_id=:user_id and isbn13=:isbn13";
    binds = {
      user_id: reviewTuple.user_id,
      isbn13: reviewTuple.isbn13,
    };
    result = await connection.execute(sql, binds);

    // 없으면 reads 추가
    if (result.rows[0][0] == 0) {
      sql = "insert into reads values(:user_id, :isbn13)";
      binds = {
        user_id: reviewTuple.user_id,
        isbn13: reviewTuple.isbn13,
      };
      await connection.execute(sql, binds);
    }

    sql =
      "select count(*) from review where user_id=:user_id and isbn13=:isbn13";
    binds = {
      user_id: reviewTuple.user_id,
      isbn13: reviewTuple.isbn13,
    };
    result = await connection.execute(sql, binds);

    if (result.rows[0][0] == 0) {
      sql = "insert into review values(0, :contents, :user_id, :isbn13)";
      binds = {
        contents: reviewTuple.contents,
        user_id: reviewTuple.user_id,
        isbn13: reviewTuple.isbn13,
      };
      await connection.execute(sql, binds);
      await connection.execute("COMMIT");

      return "insert";
    } else if (result.rows[0][0] == 1) {
      sql =
        "UPDATE review SET contents=:contents WHERE user_id=:user_id and isbn13=:isbn13";
      binds = {
        contents: reviewTuple.contents,
        user_id: reviewTuple.user_id,
        isbn13: reviewTuple.isbn13,
      };
      await connection.execute(sql, binds);
      await connection.execute("COMMIT");

      return "update";
    } else {
      await connection.execute("COMMIT");
      return false;
    }
  } catch (err) {
    if (connection) {
      try {
        await connection.execute("ROLLBACK");
        return " ROLLBACK";
      } catch (rollbackError) {
        console.error("AddReview Rollback error:", rollbackError);
      }
    }
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

async function dbGetMyRate(requestData) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    sql =
      "select rating, contents from rating where isbn13 = :isbn13 and user_id = :user_id";
    binds = { isbn13: requestData.isbn13, user_id: requestData.userId };
    result = await connection.execute(sql, binds);

    if (result.rows.length == 0) return null;

    const myRate = {
      rating: result.rows[0][0],
      contents: result.rows[0][1],
    };

    return myRate;
  } catch (err) {
    console.error("getMyRate Error: ", err);
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

async function dbGetMyReview(requestData) {
  let connection, sql, binds, result;
  try {
    connection = await oracledb.getConnection(connectionConfig);

    sql =
      "select contents from review where isbn13 = :isbn13 and user_id = :user_id";
    binds = { isbn13: requestData.isbn13, user_id: requestData.userId };
    result = await connection.execute(sql, binds);

    if (result.rows.length == 0) return null;

    const myReview = {
      contents: result.rows[0][0],
    };

    return myReview;
  } catch (err) {
    console.error("getMyReview Error: ", err);
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

    switch (requestData.searchType) {
      case 0:
        sql =
          "select b.title, b.isbn13 from book b, reads r where b.isbn13 = r.isbn13 and r.user_id = :userid and LOWER(b.title) like LOWER(:title)";
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
          "select b.title, b.isbn13 from book b, reads r, author a, writes w where b.isbn13 = r.isbn13 and b.isbn13 = w.isbn13 and w.author_id = a.author_id and r.user_id = :userid and LOWER(a.author_name) like LOWER(:author_name)";
        binds = {
          userid: requestData.userId,
          author_name: "%" + requestData.searchWord + "%",
        };
        break;
      case 3:
        sql =
          "select b.title, b.isbn13 from book b, reads r where b.isbn13 = r.isbn13 and r.user_id = :userid and LOWER(b.publisher) like LOWER(:publisher)";
        binds = {
          userid: requestData.userId,
          publisher: "%" + requestData.searchWord + "%",
        };
        break;
      case 4:
        sql =
          "select b.title, b.isbn13 from book b, reads r, series s where b.isbn13 = r.isbn13 and b.series_id = s.series_id and r.user_id = :userid and LOWER(s.series_name) like LOWER(:series_name)";
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
  dbBookInsert,
  dbGetReads,
  dbGetRate,
  dbAddRate,
  dbAddReview,
  dbCheckRead,
  dbInsertRead,
  dbDeleteRead,
  dbGetMyRate,
  dbGetMyReview,
  dbGetCustomReads,
};
