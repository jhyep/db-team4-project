const { dbWriteReview } = require("../dbUtil/dbBookUtils/dbBookUtils.js");

async function writeReview(requestData) {
  const userid = requestData.userid;
  const isbn13 = requestData.isbn13;
  const contents = requestData.contents;

  try {
    const result = await dbWriteReview(userid, isbn13, contents);

    if (result.rowsAffected > 0) {
      return { state: true };
    } else {
      return { state: false };
    }
  } catch (err) {
    console.error("Save Error: ", err);
  }
}

module.exports = { writeReview };
