require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const { encrypt, decrypt } = require("./EncryptionHandler");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: `${process.env.DB_PASSWORD}`,
  database: "PasswordManager",
});

app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
  const hashedPassword = encrypt(password);
  db.query(
    "INSERT INTO passwords (password, title, iv) VALUES (?,?,?)",
    [hashedPassword.password, title, hashedPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

app.post("/deletepassword", (req, res) => {
  const { id } = req.body;
  db.query("DELETE FROM passwords WHERE id=(?)", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/showpasswords");
    }
  });
});

let port=process.env.PORT
if(port==null || port==""){
  port=4000;
}


app.listen(port, () => {
  console.log("Server is running on port " + port);
});
