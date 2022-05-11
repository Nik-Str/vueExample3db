const fs = require('fs');
const path = require('path');
const { get } = require('../service/headers');

module.exports = (req, res) => {
  try {
    const url = req.url.split('/');
    fs.readFile(path.join(__dirname, '/../images/', url[url.length - 1]), (err, img) => {
      res.writeHead(200, { ...get, 'Content-Type': 'image/webp' });
      return res.end(img);
    });
  } catch (err) {
    console.log(err);
    res.end();
  }
};
