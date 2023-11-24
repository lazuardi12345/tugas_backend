const { PrismaClient } = require("@prisma/client");
const express = require("express");
const request = require("supertest");
const router = require("../routes/userPrisma");

const prisma = new PrismaClient();
const app = express();
app.use("/", router);

describe("test handlers", function () {
  test("respond to /", async () => {
    try {
      const response = await request(app).get("/");
      const getEmployee = await prisma.employee.findMany();
      expect(response.body).toEqual(getEmployee);
    } catch (err) {
      console.error(err);
    }
  });

  test("post to /employee", async () => {
    try {
      const reqBody = {
        nama: "Rizky",
        job: "Software Engineer",
        salary: 50000,
      };

      const response = await request(app)
        .post("/employee")
        .send(reqBody)
        .set("Accept", "application/json");

      const { nama, job, salary } = reqBody;
      const createEmployee = await prisma.employee.create({
        data: {
          nama,
          job,
          salary,
        },
      });

      expect(response.body).toEqual({
        status: true,
        message: "Data Created",
        data: {
          id: createEmployee.id,
          data: createEmployee,
        },
      });
    } catch (err) {
      console.error(err);
    }
  });
});
