/*
 * curl -H "api-key: API_KEY" https://dev.to/api/articles/me/published
 */

const fs = require("fs");
const path = require("path");
const fm = require("front-matter");
const targetDir = "./src/data/original/";

let originalData = {};
fs.readdir(targetDir, (err, files) => {
  if (err) throw err;

  const markdownFiles = files.filter(file => {
    return path.extname(file) === ".md";
  });

  markdownFiles.forEach(markdownFile => {
    fs.readFile(`./src/data/original/${markdownFile}`, "utf8", (err, data) => {
      if (err) throw err;
      const mdData = fm(data);
      mdData.attributes.published_at = new Date(
        mdData.attributes.published_at
      ).toISOString();
      const originalDataTitle = mdData.attributes.title
        .toLowerCase()
        .split(" ")
        .join("-");
      originalData[originalDataTitle] = mdData;

      // techDebt opportunity: instead of calling writeFile N Times, why don't we wait until we finish readFile and do it all at the end?
      // maybe use promisify
      const stringifiedOriginalData = JSON.stringify(originalData, null, 2);
      fs.writeFile(
        `${targetDir}Original.json`,
        stringifiedOriginalData,
        err => {
          if (err) throw err;
          return;
        }
      );
    });
  });
});
