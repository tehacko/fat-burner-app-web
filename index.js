import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs")
});

app.get("/loggedinpage", (req, res) => {
  res.render("loggedinpage.ejs")
});


app.post("/submit", (req, res) => {
  // const numLetters = req.body["fName"].length + 
  //   req.body["lName"].length;
  //   console.log(numLetters);
  //   res.render("index.ejs", {
  //     numberOfLetters: numLetters
  // //   {name: req.body["fName"]
  // });
  // if (locals.req.body["fName"]) {
  //   var heading = "What is your name?";
  // } else {
  //   var heading = req.body["fName"].length;
  // }
  // console.log(heading);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
