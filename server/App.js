require('dotenv').config();
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
const ReminderModel = require("./Reminder.js");


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
  const { name, age, gender, email,phone, password } = req.body;
  UserModel.findOne({ email: email }).then((users) => {
      if (users) 
      {
        res.status(403).send({message:"User already registered"})
      }
      else
        {
          UserModel.findOne({ phone: phone }).then((users) => {
            if (users) 
            {
              res.status(403).send({message:"User already registered"})
            }
            else{
          let counter = 1;
          encryptedPasscode = sha256(password);
          const user = new UserModel({
            name,
            age,
            gender,
            email,
            phone,
            encryptedPasscode,
            counter,
          });
        
          user.save();
          console.log("User object:", user);
          res.send(user);}
        })
    }
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
app.post("/questionnaire", async (req, res) => {
  const ques = await QuesModel.find()
  console.log(ques);
  res.status(200).send(ques);
});


// DAILY HEALTH TIPS
app.post("/DailyHealthTips", async (req, res) => {
  const healthTips = await HealthTipsModel.find()
  console.log(healthTips);
  res.status(200).send(healthTips);
})


//REMINDERS
setInterval(() => {
  ReminderModel.find({}).then((reminderList) => {
    if (reminderList) {
      reminderList.forEach(reminder => {
        if (!reminder.isReminded) {
          const now = new Date()
          if ((new Date(reminder.remindAt) - now) < 0) {
            ReminderModel.findByIdAndUpdate(reminder._id, { isReminded: true }).then((remindObj) => {
              const accountSid = process.env.WHATSAPP_ACCOUNT_SID;
              const authToken = process.env.WHATSAPP_AUTH_TOKEN;
              const client = require('twilio')(accountSid, authToken);

              client.messages
                .create({
                  body: reminder.reminderMsg,
                  from: 'whatsapp:+14155238886',
                  to: 'whatsapp:+919829081906'
                }).then(message => console.log(message.sid));
            }).catch((err) => {
              console.log(err);
            });
          }
        }
      })
    }
  }).catch((err) => {
    console.log(err);
  });
}, 1000);


app.get("/getAllReminder", (req, res) => {
  ReminderModel.find({}, (err, reminderList) => {
    if (err) console.log(err);
    if (reminderList) res.send(reminderList);
  })
})


app.post("/addReminder", async (req, res) => {
  const { reminderMsg, remindAt } = req.body
  const reminder = new ReminderModel({
    reminderMsg,
    remindAt,
    isReminded: false
  })

  reminder.save();
  ReminderModel.find({}).then((reminderList) => {
    if (reminderList) {
      res.send(reminderList);
    }
  })
})

app.post("/deleteReminder", (req, res) => {
  ReminderModel.deleteOne({ _id: req.body.id }).then(() => {
    ReminderModel.find({}).then((reminderList) => {
      if (reminderList) {
        res.send(reminderList)
      }
    }).catch((err) => {
      console.log(err);
    });
  })
})

app.listen(5000, () => console.log("Backend is running"));