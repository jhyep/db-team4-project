const { checkDupId, createUser } = require("../dbUtil/dbUtils.js");

async function signup(requestData) {
  const userid = requestData.userid;
  const password = requestData.password;
  const username = requestData.username;

  let result;

  try {
    result = await checkDupId(userid);
    if (result.rows.length > 0) {
      return { state: false, cause: "userid" };
    } else {
      result = await createUser(userid, password, username);
      if (result.rowsAffected > 0) {
        return { state: true };
      } else {
        return { state: false, cause: "error" };
      }
    }
  } catch (err) {
    console.error("SignUp Error: ", err);
  }
}

module.exports = { signup };
