const { dbUserDelete } = require("../dbUtil/dbUserUtils/dbUserUtils.js");

async function userDelete(requestData) {
  const userid = requestData.userid;

  try {
    const result = await dbUserDelete(userid);

    if (result.rowsAffected > 0) {
      return { state: true };
    } else {
      return { state: false, cause: "error" };
    }
  } catch (err) {
    console.error("Delete Error: ", err);
  }
}

module.exports = { userDelete };
