const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var sha256 = require("js-sha256"); // For Encryption

const mongoose = require("mongoose"); // For Database



const DB =
  "mongodb+srv://singh:singh@cluster0.qiskiyr.mongodb.net/revitalize?retryWrites=true&w=majority";

const UserModel = require("./User.js");
const QuesModel = require("./Ques.js");
const HealthTipsModel = require("./HealthTips.js");


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

// QUESTIONNAIRE

app.post("/questionnaire", async(req, res) => {
  const ques = await QuesModel.find()
     console.log(ques);
     res.status(200).send(ques);
 });

// DAILY HEALTH TIPS

app.post("/DailyHealthTips", async(req,res) => {
  const healthTips = await HealthTipsModel.find()
  console.log(healthTips);
  res.status(200).send(healthTips);
})
app.listen(5000, () => console.log("Backend is running"));
