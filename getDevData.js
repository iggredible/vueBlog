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
    data.forEach(article => {
      const title = article.title.toLowerCase().replace(/(\s|:)/g, "_").replace(/.*(_?!)$/g,"");
      fs.writeFile(`${targetDir}${title}.markdown`,  article.body_markdown, (err) => {
        if(err) throw err;
      })
    })
  })

