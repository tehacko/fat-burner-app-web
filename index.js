import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// const URL_API = ...
let heading;

app.get("/", (req, res) => {
  res.render("index.ejs", {
    confirmRegistration: heading,
    userData: users,
  });
});

app.get("/loggedinpage", (req, res) => {
  // Get the selected user ID
  const userId = parseInt(req.query.userId); 
  // Find the user
  const selectedUser = users.find(user => user.id === userId); 
  if (selectedUser) {
    res.render("loggedinpage.ejs", {
    // Pass the userName as an attribute of the res
      currentUserName: selectedUser.userName
    });
  } else {
    res.status(404).send("User not found!");
  }
});

app.get("/register", (req, res) => {
  res.render("register.ejs")
});

app.post("/submit", (req, res) => {
  // Saving form data in USERS list
  const { username, sex, height, birthdate } = req.body;
  // Add a new user to the array
  const newUser = {
    id: users.length + 1, // Incremental ID
    userName: username,
    sex: sex,
    height: height,
    birthdate: birthdate,
  };
  users.push(newUser);
  heading = `${username}, you have been
       successfully temporarily registered!`;
  res.redirect("/");
  console.log(users[users.length-1]);
  // 3. create a DB for the purpose
  // 4. write the data to DB
  // 5. say "${username}, you have been
  //     successfully registered."
});


// PUT method here (replace user data)
  // 1. logic
  // 2. alert box asking the user to rewrite data?

// DELETE method here
// 1. logic
// 2. alert box asking "Are you sure?"

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

var users = [
  {
    id: 1,
    userName:
      "Jeshuillo",
    sex: "male",
    height: "250",
    birthdate: "0014-12-25",
  },
  {
    id: 2,
    userName:
      "Immaculillo",
    sex: "female",
    height: "249",
    birthdate: "0000-12-08",
  },
  {
    id: 3,
    userName:
      "Tomadillo",
    sex: "male",
    height: "193",
    birthdate: "1913-02-13",
  },
  {
    id: 4,
    userName:
      "Marumillo",
    sex: "female",
    height: "173",
    birthdate: "2002-11-29",
  }
];