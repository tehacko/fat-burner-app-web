import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

const { Pool } = pg;
const db = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "fat_burner_db",
  password: "123456",
  port: 5432,
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// const URL_API = ...

let heading;
var users_db_data = [];

async function loadAllDBData() {
  try {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    console.error('Error fetching data:', err);
    return [];
  }
}

app.get("/", async (req, res) => {
  users_db_data = await loadAllDBData();
  res.render("index.ejs", {
    confirmRegistration: heading,
    userData: users_db_data,
  });
});

app.get("/login", (req, res) => {
  res.render("login.ejs")
});

app.get("/loggedinpage", (req, res) => {
  // Get the selected user ID
  const userId = parseInt(req.query.userId); 
  // Find the user
  const selectedUser = users_db_data.find(user => user.id === userId); 
  if (selectedUser) {
    res.render("loggedinpage.ejs", {
    // Pass the username as an attribute of the res
      currentUserName: selectedUser.username
    });
  } else {
    res.status(404).send("User not found!");
  }
});

app.get("/register", (req, res) => {
  res.render("register.ejs")
});


app.post("/register", async (req, res) => {
  // Check if the username is unique & less than 25 characters
  const desiredUsername = req.body["username"];
  const existingUser = users_db_data.find(
    user => user.username === desiredUsername
  );
  if (existingUser) {
    console.log("Username is already taken, try a different one.");
    return res.render("index.ejs", {
    confirmRegistration: null,
    userData: users_db_data,
    error: "Username is already taken, try a different one." 
  });
  } 
  // Check if the username is less than 25 characters 
  if (desiredUsername.length > 25) {
    console.log("Username must be less than 25 characters.");
    return res.render("index.ejs", {
      confirmRegistration: null,
      userData: users_db_data,
      error: "Username must be less than 25 characters." 
    }); 
  }
  // Database data insertion
  try {
    const result = await db.query(
      'INSERT INTO users (id, username, sex, height, birthdate) VALUES ($1, $2, $3, $4, $5)',
          [users_db_data.length + 1,
            desiredUsername,
            req.body.sex,
            req.body.height,
            req.body.birthdate
          ]
        ); 
    heading = `${desiredUsername}, you have been
       successfully registered!`;
  } catch (err) {
    console.error('Error inserting data:', err);
   }
  res.redirect("/");
  console.log(users_db_data[users_db_data.length]);

  // // Saving form data in USERS list
  // const { username, sex, height, birthdate } = req.body;
  // // Add a new user to the array
  // const newUser = {
  //   id: users_db_data.length + 1, // Incremental ID
  //   username: username,
  //   sex: sex,
  //   height: height,
  //   birthdate: birthdate,
  // };
  // users_db_data.push(newUser);
  // heading = `${username}, you have been
  //      successfully temporarily registered!`;
});

app.post("/login", async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  
  const result = await db.query()
  console.log(username);
  console.log(password);
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

// var users = [
//   {
//     id: 1,
//     username:
//       "Jeshuillo",
//     sex: "male",
//     height: "250",
//     birthdate: "0014-12-25",
//   },
//   {
//     id: 2,
//     username:
//       "Immaculillo",
//     sex: "female",
//     height: "249",
//     birthdate: "0000-12-08",
//   },
//   {
//     id: 3,
//     username:
//       "Tomadillo",
//     sex: "male",
//     height: "193",
//     birthdate: "1913-02-13",
//   },
//   {
//     id: 4,
//     userame:
//       "Marumillo",
//     sex: "female",
//     height: "173",
//     birthdate: "2002-11-29",
//   }
// ];