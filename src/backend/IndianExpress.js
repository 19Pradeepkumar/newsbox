const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

let urls = [
  ["https://indianexpress.com/section/sports/"],
  ["https://indianexpress.com/section/business/"],
  ["https://indianexpress.com/section/education/"],
];

async function extractLines(url, array) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { timeout: 100000 }); // 60 seconds

  // Wait for a specific element to load
  //sconsole.log("99");
  await page.waitForSelector(".articles .img-context>h2>a");

  const content = await page.content();
  const $ = cheerio.load(content);

  const elements = $(".articles .img-context>h2>a");
  elements.each((index, element) => {
    const ele = $(element).text();
    array.push(ele);
  });

  await browser.close();
}

async function scrapeDataIE() {
  let array = [[], [], []];
  for (let i = 0; i < urls.length; i++) {
    for (let j = 0; j < urls[i].length; j++)
      await extractLines(urls[i][j], array[i]);
  }
  // console.log(array[1].length, array[2].length);
  return array;
}

//scrapeDataIE();

module.exports = scrapeDataIE;
