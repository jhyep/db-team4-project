const { dbBookRead } = require("../dbUtil/dbBookUtils/dbBookUtils.js");

async function readBook(requestData) {
  const book = requestData.book;
  const userid = requestData.userid;

  try {
    const result = await dbBookRead(userid, book);

    if (result.rowsAffected > 0) {
      return { state: true };
    } else {
      return { state: false, cause: "exist" };
    }
  } catch (err) {
    console.error("Save Error: ", err);
  }
}

module.exports = { readBook };
