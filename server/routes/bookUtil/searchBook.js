const axios = require("axios");
require("dotenv").config();

async function isbn10to13(isbn10) {
  const isbn12 = "978" + isbn10.substring(0, 9);

  let sum = 0;
  isbn12.split("").forEach((char, i) => {
    const digit = parseInt(isbn12[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  });
  const checkDigit = (10 - (sum % 10)) % 10;
  const isbn13 = isbn12 + checkDigit;

  return isbn13;
}

async function pixelUpgrade(cover) {
  const changedUrl = cover.replace("coversum", "cover200");
  return changedUrl;
}

async function searchBook(requestData) {
  const aladinSearchUrl =
    "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?MaxResults=100&output=js&Version=20131101&CategoryId=0";

  try {
    const searchResult = [];
    let aladinResponse;
    let page = 1;
    do {
      aladinResponse = await axios.get(aladinSearchUrl, {
        params: {
          Query: requestData.query,
          QueryType: requestData.queryType,
          Sort: requestData.sort,
          RecentPublishFilter: requestData.recentPublishFilter,
          Start: page,
          ttbkey: process.env.ALADIN_API_KEY,
        },
      });
      for (const item of aladinResponse.data.item) {
        const searchItem = {
          title: item.title,
          link: item.link,
          author: item.author,
          pubDate: item.pubDate,
          isbn13: item.isbn13 ? item.isbn13 : await isbn10to13(item.isbn),
          cover: await pixelUpgrade(item.cover),
          categoryName: item.categoryName,
          publisher: item.publisher,
          seriesName: item.seriesInfo ? item.seriesInfo.seriesName : "",
        };
        searchResult.push(searchItem);
      }
      page++;
    } while (
      aladinResponse.data.totalResults / aladinResponse.data.itemsPerPage >
      aladinResponse.data.startIndex
    );

    return searchResult;
  } catch (err) {
    console.log("aladin API request err: ", err);
    throw err;
  }
}

module.exports = { searchBook };
