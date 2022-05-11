const pool = require('./database');

function getSelectedData(sql, arr) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) reject(err);
      con.query(sql, [arr], (err, res) => {
        if (err) reject(err);
        con.release();
        resolve(res);
      });
    });
  });
}

function getData(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) reject(err);
      con.query(sql, (err, res) => {
        if (err) reject(err);
        con.release();
        resolve(res);
      });
    });
  });
}

const standardQuery = `SELECT 
    products.id, products.title, products.description, products.specification, products.price, products.image_one, 
    products.image_two, products.image_three, products.s, products.m, products.l, 
    products.xl, article_nr, category.type AS category, sex.type AS sex, brand.name AS brand, color.type AS color
    FROM products 
    JOIN category ON products.category = category.id 
    JOIN sex ON products.sex = sex.id 
    JOIN brand ON products.brand = brand.id 
    JOIN color ON products.color = color.id 
`;

module.exports = { getData, getSelectedData, standardQuery };
