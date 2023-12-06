const axios = require("axios");
const { dbBookInsert } = require("../dbUtil/dbBookUtils/dbBookUtils");
require("dotenv").config();

async function infoBook(requestData) {
  const aladinBookInfoUrl =
    "https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?itemIdType=ISBN13&output=JS&Version=20131101&Cover=Big";

  try {
    const aladinResponse = await axios.get(aladinBookInfoUrl, {
      params: {
        ItemId: requestData.itemId,
        ttbkey: process.env.ALADIN_API_KEY,
      },
    });
    const item = aladinResponse.data.item[0];

    const bkInfo = {
      title: item.title,
      author: item.author,
      pubDate: item.pubDate,
      isbn13: item.isbn13 ? item.isbn13 : await isbn10to13(item.isbn),
      cover: item.cover,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      publisher: item.publisher,
      seriesId: item.seriesInfo ? item.seriesInfo.seriesId : "",
      seriesName: item.seriesInfo ? item.seriesInfo.seriesName : "",
    };

    if ((await dbBookInsert(bkInfo)) == false) {
      throw new Error("db addBook failed.");
    }

    return bkInfo;
  } catch (err) {
    console.log("infoBook err: ", err);
    throw err;
  }
}

module.exports = { infoBook };
