const { dbWriteComment } = require("../dbUtil/dbBookUtils/dbBookUtils.js");

async function writeComment(requestData) {
  const userid = requestData.userid;
  const isbn13 = requestData.isbn13;
  const rating = requestData.rating;
  const contents = requestData.contents;

  try {
    const result = await dbWriteComment(userid, rating, isbn13, contents);

    if (result.rowsAffected > 0) {
      return { state: true };
    } else {
      return { state: false };
    }
  } catch (err) {
    console.error("Save Error: ", err);
  }
}

module.exports = { writeComment };
