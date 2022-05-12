const fs = require('fs');
const path = require('path');
const { get } = require('../service/headers');

module.exports = (req, res) => {
  try {
    const url = req.url.split('/');
    fs.readFile(path.join(__dirname, '/../videos/', 'home.mp4'), (err, mp4) => {
      res.writeHead(200, { ...get, 'Content-Type': 'video/mp4' });
      return res.end(mp4);
    });
  } catch (err) {
    console.log(err);
    res.end();
  }
};
