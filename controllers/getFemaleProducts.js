const { queryData, standardQuery } = require('../service/query');
const { get } = require('../service/headers');

module.exports = async (req, res) => {
  try {
    const sql = standardQuery + "WHERE sex.type = 'Female'";
    const femaleProducts = await queryData(sql);
    res.writeHead(200, { ...get, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(femaleProducts));
  } catch (err) {
    console.log(err);
    res.end();
  }
};
