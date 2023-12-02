const { dbBookSave } = require("../dbUtil/dbBookUtils/dbBookUtils.js");

async function saveBook(requestData) {
  const book = requestData.book;
  const userid = requestData.userid;

  try {
    const result = await dbBookSave(userid, book);

    if (result.rowsAffected > 0) {
      return { state: true };
    } else {
      return { state: false, cause: "exist" };
    }
  } catch (err) {
    console.error("Save Error: ", err);
  }
}

module.exports = { saveBook };
