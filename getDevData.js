/*
 * curl -H "api-key: API_KEY" https://dev.to/api/articles/me/published
*/

require('dotenv').config()
const axios = require('axios');
const fs = require('fs');
const targetDir = './src/data/dev/'

let data;

const options = {
  headers: {"api-key": process.env.DEV_KEY}
}

axios.get(process.env.URL, options)
  .then(response => {
    fs.mkdirSync(targetDir, {recursive: true});
    data = response.data;
    // normalize here
    // per https://gist.github.com/letanure/8b4e8ee8f7b065860df942f0e53d6fc9#section-2-advanced
    // it is good to normalize array into object, if possible
    const normalizedDevData = JSON.stringify(convertArrayToObject(data, 'slug'))

    console.log(normalizedDevData.keys)
    fs.writeFile(`${targetDir}DevTo.json`, normalizedDevData, err => {
      if(err) throw err;
      console.log("Dev.to data fetched successfully!")
    })
  })


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
