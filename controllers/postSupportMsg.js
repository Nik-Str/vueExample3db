const { queryData } = require('../service/query');

module.exports = async (support) => {
  try {
    const msg = JSON.stringify({ msg: support.msg, client: support.client });
    const sql = `INSERT INTO tickets (msg, ticketId) VALUES ('${msg}','${
      support.client ? support.ticketId : support.supportId
    }')`;
    return await queryData(sql);
  } catch (err) {
    console.log(err);
  }
};
