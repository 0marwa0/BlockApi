const experss = require("express");
const Route = experss.Router();
const pool = require("../db");
const cors = require("cors");
Route.post("/users/add", async (req, res) => {
  try {
    const { name, mode, commonItems } = req.body;
    const users = await pool.query(
      `INSERT INTO users (name,mode,commonItems) VALUES 
        ($1,$2,$3) RETURNING *`,
      [name, mode, commonItems]
    );
    console.log(commonItems, "sfshhhhhhh");
    res.json(users.rows[0]);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.get("/users", async (req, res) => {
  try {
    console.log(req.body, "success");
    const users = await pool.query(`SELECT * FROM users`);
    res.json(users.rows);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
      id,
    ]);
    res.json(users.rows[0]);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await pool.query(`DELETE FROM users WHERE user_id = $1`, [
      id,
    ]);
    res.json("users deleted successfully");
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, mode, commonItems } = req.body;
  let updateAt = new Date();
  try {
    const info = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
      id,
    ]);
    let data = info.rows[0];
    const users = await pool.query(
      `UPDATE users SET name=$2,mode=$3 ,commonItems=$4,updateAt=$5 WHERE user_id = $1`,
      [
        id,
        name != null ? name : data.name,
        mode != null ? mode : data.mode,
        commonItems != null ? commonItems : data.commonItems,
        updateAt,
      ]
    );

    res.json("updated users successfully");
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
module.exports = Route;
