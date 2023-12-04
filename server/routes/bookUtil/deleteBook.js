const { dbBookDelete } = require("../dbUtil/dbBookUtils/dbBookUtils.js");

async function deleteBook(requestData) {
  const isbn13 = requestData.isbn13;

  try {
    const result = await dbBookDelete(isbn13);

    if (result.rowsAffected > 0) {
      return { state: true };
    } else {
      return { state: false, cause: "error" };
    }
  } catch (err) {
    console.error("Delete Error: ", err);
  }
}

module.exports = { deleteBook };
