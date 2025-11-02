import express from "express";

const app = express();

const PORT = 3004;

// set EJS as our view engine
app.set("view engine", "ejs");

app.use(express.static("public"));

// allows the app to parse form data (req.body)
app.use(express.urlencoded({ extended: true }));

const contacts = [];

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/submit_form", (req, res) => {
  const contact = req.body;
  contacts.push(contact);
  // res.render("confirm");
  res.json(contact);
});

app.get("/admin", (req, res) => {
  res.render("admin", { contacts });
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
