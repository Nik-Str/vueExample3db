const query = require('../service/query');
const { get } = require('../service/headers');

module.exports = async (req, res) => {
  try {
    const sql = `SELECT 
      products.id, products.title, products.description, products.specification, products.price, products.image_one, 
      products.image_two, products.image_three, products.s, products.m, products.l, 
      products.xl, category.type AS category, sex.type AS sex, brand.name AS brand, color.type AS color
      FROM products 
      JOIN category ON products.category = category.id 
      JOIN sex ON products.sex = sex.id 
      JOIN brand ON products.brand = brand.id 
      JOIN color ON products.color = color.id
      WHERE sex.type = 'Male'`;

    const maleProducts = await query(sql);

    res.writeHead(200, { ...get, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(maleProducts));
  } catch (err) {
    console.log(err);
    res.end();
  }
};
