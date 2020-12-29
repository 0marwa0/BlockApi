const experss = require("express");
const Route = experss.Router();
const pool = require("../db");
const cors = require("cors");
Route.post("/list/add", async (req, res) => {
  try {
    const {
      creater,
      currency,
      total,
      items,
      discount,
      costumername,
      recive,
      restprice,
    } = req.body;

    const list = await pool.query(
      `INSERT INTO list (creater,currency,total,items,discount,costumername,recive,restprice) VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        creater,
        currency,
        total,
        items,
        discount,
        costumername,
        recive,
        restprice,
      ]
    );

    res.json(list.rows[0]);
  } catch (error) {
    res.send("error");
    console.log(req.body, "error");
  }
});
Route.get("/list", async (req, res) => {
  try {
    console.log(req.body, "success");
    const list = await pool.query(`SELECT * FROM list`);
    res.json(list.rows);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.get("/list/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const list = await pool.query(`SELECT * FROM list WHERE list_id = $1`, [
      id,
    ]);
    res.json(list.rows[0]);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.delete("/list/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const list = await pool.query(`DELETE FROM list WHERE list_id = $1`, [id]);
    res.json("list deleted successfully");
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.put("/list/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const {
      creater,
      currency,
      total,
      items,
      discount,
      costumername,
      recive,
      restprice,
    } = req.body;
    console.log(req.body, "success");
    const info = await pool.query(`SELECT * FROM list WHERE list_id = $1`, [
      id,
    ]);

    let data = info.rows[0];
    const list = await pool.query(
      `UPDATE list SET creater=$2,currency=$3,total=$4,items=$5,discount=$6,costumername=$7,recive=$8,restprice=$9 WHERE list_id = $1
         `,
      [
        id,
        creater != null ? creater : data.creater,
        currency != null ? currency : data.currency,
        total != null ? total : data.total,
        items != null ? items : data.items,
        discount != null ? discount : data.discount,
        costumername != null ? costumername : data.costumername,
        recive != null ? recive : data.recive,
        restprice != null ? restprice : data.restprice,
      ]
    );

    res.json("updated list successfully");
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
module.exports = Route;
