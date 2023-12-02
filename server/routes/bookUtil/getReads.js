const { dbGetReads } = require("../dbUtil/dbBookUtils/dbBookUtils.js");

async function getReads(requestData) {
  const userid = requestData.userid;

  try {
    const result = await dbGetReads(userid);

    if (result.rows.length > 0) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Save Error: ", err);
  }
}

module.exports = { getReads };
