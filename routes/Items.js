const experss = require("express");
const Route = experss.Router();
const pool = require("../db");
const cors = require("cors");
Route.post("/items/add", async (req, res) => {
  try {
    const { name, quantity, price, discount, total } = req.body;
    console.log(req.body, "success");
    const item = await pool.query(
      `INSERT INTO item (name,quantity,price,discount,total) VALUES 
        ($1,$2,$3,$4,$5) RETURNING *`,
      [name, quantity, price, discount, total]
    );
    res.json(item.rows[0]);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.get("/items", async (req, res) => {
  try {
    console.log(req.body, "success");
    const item = await pool.query(`SELECT * FROM item`);
    res.json(item.rows);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.get("/items/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await pool.query(`SELECT * FROM item WHERE item_id = $1`, [
      id,
    ]);
    res.json(item.rows[0]);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await pool.query(`DELETE FROM item WHERE item_id = $1`, [id]);
    res.json("item deleted successfully");
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, discount, total } = req.body;
  try {
    const info = await pool.query(`SELECT * FROM item WHERE item_id = $1`, [
      id,
    ]);
    let data = info.rows[0];
    const item = await pool.query(
      `UPDATE item SET name=$2 ,price=$3, quantity=$4,discount=$5,total=$6 WHERE item_id = $1`,
      [
        id,
        name != null ? name : data.name,
        price != null ? price : data.price,
        quantity != null ? quantity : data.quantity,
        discount != null ? discount : data.discount,
        total != null ? total : data.total,
      ]
    );

    res.json("updated item successfully");
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
module.exports = Route;
