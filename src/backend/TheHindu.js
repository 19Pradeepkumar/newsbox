// const cheerio = require("cheerio");
const axios = require("axios");
const cheerio = require("cheerio");

let urls = [
  [
    "https://www.thehindu.com/sport/",
    "https://www.thehindu.com/sport/cricket/",
    "https://www.thehindu.com/sport/football/",
  ],
  [
    "https://www.thehindu.com/business/",
    "https://www.thehindu.com/business/Economy/",
    "https://www.thehindu.com/business/markets/",
  ],
  [
    "https://www.thehindu.com/sci-tech/science/",
    "https://www.thehindu.com/sci-tech/technology/",
  ],
];

async function extractLines(url, array) {
  await axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(".element").each((index, element) => {
        const title = $(element).find(".title>a").text();

        array.push(title);
      });

      //console.log(newsItems);
    })
    .catch((error) => {
      console.error(`Error fetching the URL: ${error}`);
    });
}

async function scrapeData() {
  console.log("hi");
  let array = [[], [], []];
  for (let i = 0; i < urls.length; i++) {
    for (let j = 0; j < urls[0].length; j++)
      await extractLines(urls[i][j], array[i]);
  }
  return array;
}

module.exports = scrapeData;

// const axios = require("axios");
// const cheerio = require("cheerio");

// URL of the website to scrape
//const url = "https://www.thehindu.com/sport/";

// axios
//   .get(url)
//   .then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);

//     const newsItems = [];

//     // Adjust the selector to match the website's structure
//     $(".element").each((index, element) => {
//       const title = $(element).find(".title>a").text();
//       // const link = $(element).find('.news-link').attr('href');
//       //const summary = $(element).find('.news-summary').text();

//       newsItems.push(title);
//     });

//     console.log(newsItems);
//   })
//   .catch((error) => {
//     console.error(`Error fetching the URL: ${error}`);
//   });
