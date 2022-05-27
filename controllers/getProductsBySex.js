const { queryData, standardQuery } = require('../service/query');
const { get } = require('../service/headers');

module.exports = async (req, res, sex) => {
  try {
    const sql = standardQuery + `WHERE sex.type = '${sex}'`;
    const maleProducts = await queryData(sql);
    res.writeHead(200, { ...get, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(maleProducts));
  } catch (err) {
    console.log(err);
    res.end();
  }
};
