const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');
const app = express();

app.get('/', (req, res, next) => {
  superagent.get('http://dig.chouti.com')
    .end((err, sres) => {
      if (err) {
        return next(err);
      }

      const items = [];
      const $ = cheerio.load(sres.text);
      $('#content-list .part2').each((idx, element) => {
        const $element = $(element);
        items.push({
          title: $element.attr('share-title'),
          href: $element.attr('href'),
          img: $element.attr('share-pic')
        });
      });
      res.send(items);
    });
});

app.listen(3000, () => {
  console.log('app is listening at port 3000');
});
