import { writeFile } from "fs/promises";
import readline from "readline";
import puppeteer from "puppeteer";

const google = async (query, callback) => {
  try {
    const encodedQuery = encodeURIComponent(query);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${encodedQuery}`);

    await page.waitForSelector(".MjjYud");

    const data = await page.evaluate(() => {
      const results = document.querySelectorAll(".MjjYud");

      let dataArr = [];

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const anchor = result.querySelector("a");
        if (anchor) {
          const url = anchor.href;
          const heading3 = anchor.querySelector("h3");

          if (heading3) {
            const title = heading3.innerText;

            dataArr.push({ title: title, link: url });
          }
        }
      }

      return dataArr;
    });

    callback(data);
    browser.close();
  } catch (error) {
    console.log(`fetching data failed: ${error} "<C-c> to close"`);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("query ?: ", (answer) => {
  try {
    console.log("processing ...");
    google(`${answer}`, async (data) => {
      let mdTable = data
        .map((item) => {
          return `| ${item.title} | <a href="${item.link}" target="_blank">${item.link}</a> |`;
        })
        .join("\n");

      mdTable = `| Title | Link |\n| ----- | ----- |\n` + mdTable;

      await writeFile("./results.md", mdTable, "utf-8");
      console.log(`writing to : ./results.md`);
      rl.close();
    });
  } catch (error) {
    console.log(`error: ${error}`);
    rl.close();
  }
});
