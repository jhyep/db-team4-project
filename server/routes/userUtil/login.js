const { checkDupId } = require("../dbUtil/dbUserUtils/dbUserUtils.js");

async function login(requestData) {
  const userid = requestData.userid;
  const password = requestData.password;

  try {
    const result = await checkDupId(userid);

    if (result.rows.length > 0) {
      if (password == result.rows[0].PASSWORD) {
        return { state: true };
      } else {
        return { state: false, cause: "password" };
      }
    } else {
      return { state: false, caues: "userid" };
    }
  } catch (err) {
    console.error("LogIn Error: ", err);
  }
}

module.exports = { login };
