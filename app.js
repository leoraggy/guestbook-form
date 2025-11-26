import express from "express";
import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql2
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  })
  .promise();

const app = express();

const PORT = 3004;

// set EJS as our view engine
app.set("view engine", "ejs");

app.use(express.static("public"));

// allows the app to parse form data (req.body)
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.get("/admin", async (req, res) => {
  try {
    const [contacts] = await pool.query("SELECT * FROM contacts");
    res.render("admin", { contacts });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Database error" + error.message);
  }
});

app.get("/db-test", async (req, res) => {
  try {
    const [contacts] = await pool.query("SELECT * FROM contacts");

    res.send(contacts);
  } catch (error) {
    console.error("Database error:", error);
  }
});

app.post("/submit_form", async (req, res) => {
  try {
    const contact = req.body;
    contact.timeSubmitted = new Date();
    console.log(contact);

    const sql = `INSERT INTO contacts(fname, lname, job, company, linkedin, email, meet, message, mailing, format,timeSubmitted)
    VALUES(?,?,?,?,?,?,?,?,?,?,?)`;

    const contact1 = {
      fname: contact.fname,
      lname: contact.lname,
      job: contact.job || null,
      company: contact.company || null,
      linkedin: contact.linkedin || null,
      email: contact.email || null,
      meet:
        contact.meet !== "otherOption" ? contact.meet : contact.other || null,
      message: contact.message || null,
      mailing: contact.mailing || null,
      fortmat: contact.format || null,
      timeSubmitted: contact.timeSubmitted || null,
    };

    const params = Object.values(contact1);

    const [result] = await pool.execute(sql, params);
    console.log("Contact saved with ID:", result.insertId);
    res.render("confirm", { contact });
  } catch (error) {
    console.error("Error saving contact:", error);
    res
      .status(500)
      .send(
        "Sorry, there was an error processing your contact. Please try again"
      );
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
