const bodyParser = require('../service/bodyParser');
const { queryData } = require('../service/query');
const { post } = require('../service/headers');

module.exports = async (req, res) => {
  try {
    const data = await bodyParser(req);
    const sql = `DELETE FROM tickets WHERE ticketId = '${data.id}'`;
    await queryData(sql);
    res.writeHead(200, { ...post, 'Content-Type': 'application/json' });
    res.end();
    return data.id;
  } catch (err) {
    console.log(err);
  }
};
