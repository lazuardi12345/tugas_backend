const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();

const prisna = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const employee = await prisma.employee.findMany();
    res.send(employee);
  } catch (err) {
    res.send("Gagal Mengeamil Data Employee!");
  }
});

router.get("/employee/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id_employee: parseInt(id) },
    });

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ err: "Data Employee Tidak Ditemukan." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal Mengambil Data Employee!" });
  }
});

router.post("/employee", async (req, res) => {
  try {
    const { nama, job, salary } = req.body;
    const employee = await prisma.employee.create({
      data: {
        nama,
        job,
        salary,
      },
    });

    res.send({
      status: true,
      message: "Data Create",
      data: employee,
    });
  } catch (err) {
    res.send({
      status: false,
      err: "Gagal Membuat Data Employee Baru!",
    });
  }
});

router.put("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, job, salary } = req.body;

    const updateEmployee = await prisma.employee.update({
      where: { id_employee: parseInt(id) },
      data: { nama, job, salary },
    });

    res.send({
      status: true,
      message: "Update Success",
      data: updateEmployee,
    });
  } catch (err) {
    res.send({
      status: false,
      error: "Gagal Memperbarui Data Employee!",
    });
  }
});

router.delete("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletEmployee = await prisma.employee.delete({
      where: { id_employee: parseInt(id) },
    });

    res.send({
      status: true,
      message: "Delete Success",
      data: deletEmployee,
    });
  } catch (err) {
    res.send({
      status: false,
      error: "Gagal Menghapus Data Employee!",
    });
  }
});
