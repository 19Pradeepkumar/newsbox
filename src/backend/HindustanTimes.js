const cheerio = require("cheerio");
const axios = require("axios");

let urls = [
  ["https://www.hindustantimes.com/sports"],
  ["https://www.hindustantimes.com/business"],
  [
    "https://www.hindustantimes.com/education/employment-news",
    "https://www.hindustantimes.com/education/admissions",
    "https://www.hindustantimes.com/education/exam-results",
  ],
];

async function extractLines(url, array) {
  await axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(".hdg3").each((index, element) => {
        const title = $(element).find("a").text();
        array.push(title);
      });
    })
    .catch((error) => {
      console.error(`Error fetching the URL: ${error}`);
    });
}

async function scrapeDataHT() {
  let array = [[], [], []];
  console.log("HT");
  for (let i = 0; i < urls.length; i++) {
    for (let j = 0; j < urls[i].length; j++)
      await extractLines(urls[i][j], array[i]);
  }
  //console.log(array[0].length, array[1].length, array[2].length);
  return array;
}

//scrapeDataTOI();

module.exports = scrapeDataHT;
