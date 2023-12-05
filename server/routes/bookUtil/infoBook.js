const axios = require("axios");
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
      categoryName: item.categoryName,
      publisher: item.publisher,
      seriesName: item.seriesInfo ? item.seriesInfo.seriesName : "",
      categoryid: item.categoryId,
      seriesid: 0,
      salespoint: item.salesPoint,
      numofrating: item.customerReviewRank,
    };

    return bkInfo;
  } catch (err) {
    console.log("aladin API request err: ", err);
    throw err;
  }
}

module.exports = { infoBook };
