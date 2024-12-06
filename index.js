import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "fat_burner_db",
  password: "123456",
  port: 5432,
});

const app = express();
const port = 3000;

var users_db_data = [];
async function loadAllDBData() {
  try {
    db.connect();
    const result = await db.query('SELECT * FROM users');
    db.end();
    return result.rows;
  } catch (err) {
    console.error('Error fetching data:', err);
    return [];
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// const URL_API = ...

let heading;

app.get("/", async (req, res) => {
  users_db_data = await loadAllDBData();
  console.log(users_db_data);
  res.render("index.ejs", {
    confirmRegistration: heading,
    userData: users_db_data,
  });
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

app.post("/submit", (req, res) => {
  // Saving form data in USERS list
  const { username, sex, height, birthdate } = req.body;
  // Add a new user to the array
  const newUser = {
    id: users_db_data.length + 1, // Incremental ID
    username: username,
    sex: sex,
    height: height,
    birthdate: birthdate,
  };
  users_db_data.push(newUser);
  heading = `${username}, you have been
       successfully temporarily registered!`;
  res.redirect("/");
  console.log(users_db_data[users_db_data.length-1]);
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