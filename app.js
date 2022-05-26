const http = require('http');
require('dotenv').config();
const port = process.env.PORT | 3000;
const saveSupportMsg = require('./controllers/postSupportMsg');
const { get } = require('./service/headers');
const { v4: uuidv4 } = require('uuid');
const clients = new Map();

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
  } else if (req.url === '/supportlist') {
    const keys = [...clients.keys()].filter((item) => item.slice(-7) !== 'support');
    res.writeHead(200, { ...get, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(keys));
  } else if (req.url === '/supportchat') {
    const getSupportChat = require('./controllers/getSupprortMsg');
    return await getSupportChat(req, res);
  } else if (req.url === '/removesupport') {
    const removeSupportChat = require('./controllers/removeSupportChat');
    const id = await removeSupportChat(req, res);
    return clients.delete(id);
  } else {
    res.write('404 not found');
    return res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

const webSocketServer = require('ws');
const wss = new webSocketServer.Server({ server: server });

wss.on('connection', async (ws, req) => {
  const id = uuidv4();
  if (req.url === '/support') {
    clients.set(id + '-support', ws);
    ws.send(JSON.stringify({ ticketId: id + '-support' }));
  } else {
    clients.set(id, ws);
    ws.send(JSON.stringify({ ticketId: id }));
  }

  ws.on('message', async (msg) => {
    try {
      const message = JSON.parse(msg);
      if (message.ticketId && !message.supportId) {
        clients.get(message.ticketId).send(JSON.stringify(message));
      } else {
        clients.get(message.ticketId).send(JSON.stringify(message));
        clients.get(message.supportId).send(JSON.stringify(message));
      }
      await saveSupportMsg(message);
    } catch (err) {
      ws.terminate();
    }
  });
});

const { querySelectedData } = require('./service/query');
const cleaner = async () => {
  try {
    const keys = [...clients.keys()].filter((item) => item.slice(-7) !== 'support');
    if (keys.length >= 1) {
      const sql = `SELECT ticketId FROM tickets WHERE ticketId IN (?)`;
      const query = await querySelectedData(sql, keys);

      const uniq = [...new Set(query.map((item) => item.ticketId))];
      keys.forEach((item) => {
        if (!uniq.includes(item)) clients.delete(item);
      });
    }
  } catch (err) {
    console.log(err);
  }
  setTimeout(() => {
    cleaner();
  }, 600000);
};

setTimeout(() => {
  cleaner();
}, 600000);
