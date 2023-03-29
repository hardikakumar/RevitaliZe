const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var sha256 = require("js-sha256"); // For Encryption

const mongoose = require("mongoose"); // For Database
// const userSchema = new mongoose.Schema({collection: 'users' });
// const UserModel = mongoose.model('User',{},'users');

const UserModel = require("./User.js");
const DB =
  "mongodb+srv://singh:singh@cluster0.qiskiyr.mongodb.net/revitalize?retryWrites=true&w=majority";

const QuesModel = require("./Ques.js");

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection"));

const app = express();
app.use(cors());
let items;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SIGNU-UP FORM
app.post("/users", async (req, res) => {
  const { name, age, gender, email, password } = req.body;
  UserModel.findOne({ email: email }).then((users) => {
      if (users) 
      {
        res.status(403).send({message:"User already registered"})
      }
      else
        {
          let counter = 1;
          encryptedPasscode = sha256(password);
          const user = new UserModel({
            name,
            age,
            gender,
            email,
            encryptedPasscode,
            counter,
          });
        
          user.save();
          console.log("User object:", user);
          res.send(user);}
    })
    .catch((err) => {
      console.log(err);
    });
  
    
});

// LOGIN FORM
app.post("/userLogin", async (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((users) => {
      if (users) {
        console.log(password);
        console.log(users.encryptedPasscode);
        console.log(users);
        encryptedPasscode = sha256(password);
        if (encryptedPasscode === users.encryptedPasscode) {
          res.status(200).send(users.name);
        } else {
          res.status(400).send({ message: "Password didn't match" });
        }
      } else {
        res.status(404).send({ message: "User not registered" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});

app.post("/questionnaire", async(req, res) => {
  //const { idx } = req.body;
  const v = await QuesModel.find()
     res.status(200).send(v);
 });
app.listen(5000, () => console.log("Backend is running"));
