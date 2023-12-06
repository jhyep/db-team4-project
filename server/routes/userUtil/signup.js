const {
  checkDupId,
  createUser,
} = require("../dbUtil/dbUserUtils/dbUserUtils.js");

async function signup(requestData) {
  const userid = requestData.userid;
  const password = requestData.password;
  const username = requestData.username;

  let result;

  try {
    result = await createUser(userid, password, username);

    return result;
  } catch (err) {
    console.error("SignUp Error: ", err);
  }
}

module.exports = { signup };
