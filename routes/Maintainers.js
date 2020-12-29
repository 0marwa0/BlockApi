const experss = require("express");
const Route = experss.Router();
const pool = require("../db");
const cors = require("cors");
Route.post("/maintainers/add", async (req, res) => {
  try {
    const { name, phone, address, image, backimage, list } = req.body;
    const maintainers = await pool.query(
      `INSERT INTO maintainers (name,phone, address, image, backimage,list) VALUES 
        ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [name, phone, address, image, backimage, list]
    );
    res.json(maintainers.rows[0]);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.get("/maintainers", async (req, res) => {
  try {
    console.log(req.body, "success");
    const maintainers = await pool.query(`SELECT * FROM maintainers`);
    res.json(maintainers.rows);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.get("/maintainers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const maintainers = await pool.query(
      `SELECT * FROM maintainers WHERE maintainers_id = $1`,
      [id]
    );
    res.json(maintainers.rows[0]);
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.delete("/maintainers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const maintainers = await pool.query(
      `DELETE FROM maintainers WHERE maintainers_id = $1`,
      [id]
    );
    res.json("maintainers deleted successfully");
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
Route.put("/maintainers/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, address, image, backimage, list } = req.body;
  let updateAt = new Date();
  try {
    const info = await pool.query(
      `SELECT * FROM maintainers WHERE maintainers_id = $1`,
      [id]
    );
    let data = info.rows[0];
    const maintainers = await pool.query(
      `UPDATE maintainers SET name=$2, phone=$3, address=$4, image=$5, backimage=$6, list=$7 WHERE maintainers_id = $1`,
      [
        id,
        name != null ? name : data.name,
        phone != null ? phone : data.phone,
        address != null ? address : data.address,
        image != null ? image : data.image,
        backimage != null ? backimage : data.backimage,
        list != null ? list : data.list,
      ]
    );

    res.json("updated maintainers successfully");
  } catch (error) {
    res.send("error");
    console.log(error, "error");
  }
});
module.exports = Route;
