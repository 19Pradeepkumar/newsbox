const cheerio = require("cheerio");
const axios = require("axios");

const urls = [
  "https://www.google.com/finance/quote/SENSEX:INDEXBOM",
  "https://www.google.com/finance/quote/NIFTY_50:INDEXNSE",
  "https://www.google.com/finance/quote/NIFTY_BANK:INDEXNSE",
  "https://www.google.com/finance/quote/NIFTY_IT:INDEXNSE",
];

async function fecthdata(data, url) {
  await axios.get(url).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    let price;
    $(".kf1m0").each((index, element) => {
      price = $(element).find("div").text();
    });
    let prevClose = $(".eYanAe .P6K39c").first().text();
    data.push([price, prevClose]);
  });
}

async function stockprice() {
  const data = [];
  for (let i = 0; i < urls.length; i++) {
    await fecthdata(data, urls[i]);
  }
  return data;
}

module.exports = stockprice;
