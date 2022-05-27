const { queryData } = require('../service/query');
const { post } = require('../service/headers');
const bodyParser = require('../service/bodyParser');

module.exports = async (req, res) => {
  try {
    const body = await bodyParser(req);
    const sql = `SELECT * FROM tickets WHERE ticketId = '${body.id}'`;
    const supportchat = await queryData(sql);

    const parse = supportchat.map((item) => {
      return JSON.parse(item.msg);
    });

    res.writeHead(200, { ...post, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(parse));
  } catch (err) {
    console.log(err);
  }
};
