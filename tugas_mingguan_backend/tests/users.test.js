const express = require("express");
const request = require("supertest");
const router = require("../routes/users");
const db = require("../config/config");

const app = express();
app.use("/", router);

describe("test handlers", function () {
  test("respond to /", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("API READY TO GO!");
  });

  test("respond to /employee", async () => {
    const response = await request(app).get("/employee");
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, data) => {
      expect(err).toBeNull();
      expect(response.body).toEqual({
        status: true,
        message: "GET success",
        data: data,
      });
    });
  });
});

test("post to employee", async () => {
  const reqBody = {
    nama: "Rizky",
    job: "Software Engineer",
    salary: 5000,
  };
  const response = await request(app)
    .post("/employee")
    .send(reqBody)
    .set("Accept", "application/json");

  try {
    const { nama, job, salary } = reqBody;
    const sql = `INSERT INTO employee (nama, job, salary) VALUES
    ('${nama}', '${job}', ${salary})`;

    db.query(sql, (err, data) => {
      expect(err).toBeNull();
      expect(response.body).toEqual({
        status: true,
        message: "Data Created",
        data: {
          id: data.insertId,
          fields: reqBody,
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
});

afterAll((done) => {
  db.end(done);
});
