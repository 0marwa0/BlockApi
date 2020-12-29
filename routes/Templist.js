const experss = require("express");
const Route = experss.Router();
const pool = require("../db");
const cors = require("cors");
Route.post("/templist/add", async (req, res) => {
  try {
    const { name, items } = req.body;
    console.log(req.body, "success");
    const templist = await pool.query(
      `INSERT INTO templist (name,items) VALUES 
        ($1,$2) RETURNING *`,
      [name, items]
    );
    res.json(templist.rows[0]);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.get("/templist", async (req, res) => {
  try {
    console.log(req.body, "success");
    const templist = await pool.query(`SELECT * FROM templist`);
    res.json(templist.rows);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.get("/templist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const templist = await pool.query(
      `SELECT * FROM templist WHERE temp_id = $1`,
      [id]
    );
    res.json(templist.rows[0]);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.delete("/templist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const templist = await pool.query(
      `DELETE FROM templist WHERE temp_id = $1`,
      [id]
    );
    res.json("templist deleted successfully");
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.put("/templist/:id", async (req, res) => {
  const { id } = req.params;
  const { name, items } = req.body;
  let updateAt = new Date();
  try {
    const info = await pool.query(`SELECT * FROM templist WHERE temp_id = $1`, [
      id,
    ]);
    let data = info.rows[0];
    const templist = await pool.query(
      `UPDATE templist SET name=$2 ,items=$3,updateAt=$4 WHERE temp_id = $1`,
      [
        id,
        name != null ? name : data.name,
        items != null ? items : data.items,
        updateAt,
      ]
    );

    res.json("updated templist successfully");
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
module.exports = Route;
