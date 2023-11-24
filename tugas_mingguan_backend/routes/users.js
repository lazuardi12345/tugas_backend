const express = require("express");
const router = express.Router();
const db = require("../config/config"); // Ubah path jika diperlukan

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("API READY TO GO");
});

// read
router.get("/employee", (req, res) => {
  // Ubah path menjadi '/employee'
  const sql = `SELECT * FROM employee`; // Perbaiki penulisan 'SELECT'

  db.query(sql, (err, data) => {
    if (err) {
      res.send({
        status: false,
        data: [],
      });
    } else {
      res.send({
        status: true,
        message: "GET SUCCESS", // Perbaiki penulisan 'message'
        data: data,
      });
    }
  });
});

// read by Id
router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM employee WHERE id_employee = ${id}`; // Perbaiki penulisan 'SELECT'

  db.query(sql, (err, data) => {
    if (err) {
      res.send({
        status: false,
        data: [],
      });
    } else {
      res.send({
        status: true,
        message: "GET SUCCESS", // Perbaiki penulisan 'message'
        data: data,
      });
    }
  });
});

// Create data baru
router.post("/employee", (req, res) => {
  const { nama, job, salary } = req.body;
  const sql = `INSERT INTO employee (nama, job, salary) VALUES ('${nama}', '${job}', '${salary}')`;

  db.query(sql, (err, data) => {
    if (err) {
      res.send({
        status: false,
        data: [],
      });
    } else {
      res.send({
        status: true,
        message: "Data Created", // Perbaiki penulisan 'message'
        data: data,
      });
    }
  });
});

// Update employee
router.put("/employee/:id", (req, res) => {
  const { nama, job, salary } = req.body;
  const id = req.params.id;
  const sql = `UPDATE employee SET nama = '${nama}', job = '${job}', salary = '${salary}' WHERE id_employee = ${id}`;

  db.query(sql, (err, data) => {
    if (err) {
      res.send({
        status: false,
        data: [],
      });
    } else {
      res.send({
        status: true,
        message: "Update Success", // Perbaiki penulisan 'message'
        data: data,
      });
    }
  });
});

// DELETE employee
router.delete("/employee", (req, res) => {
  // Ubah path menjadi '/employee'
  const { nama, job, salary } = req.body;
  const sql = `DELETE FROM employee WHERE nama = '${nama}'`; // Perbaiki penulisan 'DELETE'

  db.query(sql, (err, data) => {
    if (err) {
      res.send({
        status: false,
        data: [],
      });
    } else {
      res.send({
        status: true,
        message: "Delete Success", // Perbaiki penulisan 'message'
        data: data,
      });
    }
  });
});

module.exports = router;
