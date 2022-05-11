const { post } = require('../service/headers');
const { getSelectedData, standardQuery } = require('../service/query');
const bodyParser = require('../service/bodyParser');

module.exports = async (req, res) => {
  try {
    const body = await bodyParser(req);
    const sql = standardQuery + 'WHERE article_nr IN (?)';
    const products = await getSelectedData(sql, body.products);
    res.writeHead(200, { ...post, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);
    res.end();
  }
};
