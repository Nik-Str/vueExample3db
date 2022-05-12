const http = require('http');
require('dotenv').config();
const port = process.env.PORT | 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === '/products/male' && req.method === 'GET') {
    const getMaleProducts = require('./controllers/getMaleProducts');
    return await getMaleProducts(req, res);
  } else if (req.url === '/products/female' && req.method === 'GET') {
    const getFemaleProducts = require('./controllers/getFemaleProducts');
    return await getFemaleProducts(req, res);
  } else if (req.url === '/products' && req.method === 'POST') {
    const getProduct = require('./controllers/getProducts');
    return await getProduct(req, res);
  } else if (req.url.match(/\/image\/([a-zA-Z0-9_.-]*)/) && req.method === 'GET') {
    const getImage = require('./controllers/getImage');
    return getImage(req, res);
  } else if (req.url === '/homevideo') {
    const getVideo = require('./controllers/getHomeVideo');
    return getVideo(req, res);
  } else {
    res.write('404 not found');
    return res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
