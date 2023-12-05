const { dbGetReads } = require("../dbUtil/dbBookUtils/dbBookUtils.js");
const { dbGetCustomReads } = require("../dbUtil/dbBookUtils/dbBookUtils.js");

async function getReads(requestData) {
  try {
    let result;

    if (requestData.searchWord == null) {
      result = await dbGetReads(requestData.userid);
    } else {
      result = await dbGetCustomReads(requestData);
    }

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
