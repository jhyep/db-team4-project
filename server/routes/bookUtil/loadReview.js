const { dbLoadReview } = require("../dbUtil/dbBookUtils/dbBookUtils.js");

async function loadReview(requestData) {
  const userid = requestData.userid;
  const isbn13 = requestData.isbn13;

  try {
    const result = await dbLoadReview(userid, isbn13);

    if (result.rows.length > 0) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Save Error: ", err);
  }
}

module.exports = { loadReview };
