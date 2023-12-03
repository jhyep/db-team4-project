const { updateUser } = require("../dbUtil/dbUserUtils/dbUserUtils.js");

async function update(requestData) {
  const userid = requestData.userid;
  const username = requestData.username;
  const password = requestData.password;

  try {
    const result = await updateUser(userid, username, password);

    if (result.rowsAffected > 0) {
      return { state: true };
    } else {
      return { state: false, cause: "error" };
    }
  } catch (err) {
    console.error("Delete Error: ", err);
  }
}

module.exports = { update };
