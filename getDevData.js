/*
 * curl -H "api-key: API_KEY" https://dev.to/api/articles/me/published
 */

require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const targetDir = "./src/data/dev/";
const URL = "https://dev.to/api/articles/me/published";

let data;

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
      id: item
    };
  }, initialValue);
};

const options = {
  headers: { "api-key": process.env.DEV_KEY }
};

axios.get(URL, options).then(response => {
  fs.mkdirSync(targetDir, { recursive: true });
  data = response.data;
  const normalizedDevData = JSON.stringify(
    convertArrayToObject(data, "slug"),
    null,
    2
  );

  fs.writeFile(`${targetDir}DevTo.json`, normalizedDevData, err => {
    if (err) throw err;
    return;
  });
});
