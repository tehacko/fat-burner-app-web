import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let heading;

app.get("/", (req, res) => {
  res.render("index.ejs", {confirmRegistration: heading});
});

app.get("/loggedinpage", (req, res) => {
  res.render("loggedinpage.ejs")
});

app.get("/register", (req, res) => {
  res.render("register.ejs")
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  const username = req.body["username"];
  heading = `Thank you for your desire to register, ${username}!`;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
