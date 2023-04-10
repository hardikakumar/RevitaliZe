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
const DoshaReportModel = require("./DoshaReport.js");
const RemediesModel = require("./Remedies.js");
const ReminderModel = require("./Reminder.js");
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
      if (users) 
      {
        encryptedPasscode = sha256(password);
        if (encryptedPasscode === users.encryptedPasscode) 
        {
          res.status(200).send(users);
        } else 
        {
          res.status(400).send({ message: "Password didn't match" });
        }
      } 
      else 
      {
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

// GENERATE DOSHA REPORT & POSTING IT IN DATABASE

app.post("/doshareport", (req, res) => {
  const { vatta, pitta, kapha, member_id,date } = req.body;
        const doshareport = new DoshaReportModel({
          member_id,
          date,
          vatta,
          pitta,
          kapha,
        });
        doshareport.save();
        //console.log(doshareport);
  console.log(doshareport);
});


// FETCH ALL THE PAST DOSHA REPORTS OF THE PARTICULAR USER
app.get("/latestDoshaScore", async(req, res) => {
  //const { member_id } = req.body;
  const member_id = "641df0dcf6fa41af073446c8";
  const reports = await DoshaReportModel.find({member_id:member_id})
  console.log(reports);
  const l = reports.length;
  res.send(reports[l-1]);
 // res.status(200).send(ques);
});


// REMEDIES

app.post("/Remedies", async (req, res) => {
  const { RemedyName, Description , Eczema, Hyperthyroidism, Hypothyroidism, PCOD, Type, Dosha } = req.body;
  
          const remedy = new RemediesModel({
            RemedyName,
            Description,
            Eczema,
            Hyperthyroidism,
            Hypothyroidism,
            PCOD,
            Type,
            Dosha
          });
        
          remedy.save();
          console.log("Remedy object:", remedy);
          res.send(remedy);
        })
        


//REMINDERS
setInterval(() => {
  ReminderModel.find({}).then((reminderList) => {
    if (reminderList) {
      reminderList.forEach(reminder => {
          const now = new Date()
          var reminderTime = new Date(reminder.remindAt);
          if ((reminderTime - now) < 0) {
              reminderTime.setHours(reminderTime.getHours()+reminder.reminderFreq);
              ReminderModel.findByIdAndUpdate(reminder._id, { remindAt: reminderTime }).then((remindObj) => {
              const accountSid = process.env.WHATSAPP_ACCOUNT_SID;
              const authToken = process.env.WHATSAPP_AUTH_TOKEN;
              const client = require('twilio')(accountSid, authToken);

              client.messages
                .create({
                  body: "A reminder from RevitaliZe: *"+reminder.reminderMsg+"*",
                  from: 'whatsapp:+14155238886',
                  to: 'whatsapp:+919829081906'
                  // to: 'whatsapp:+918949291337'
                }).then(message => console.log(message.sid));
            }).catch((err) => {
              console.log(err);
            });
          }
      })
    }
  }).catch((err) => {
    console.log(err);
  });
}, 1000);


app.get("/getAllReminder", (req, res) => {
  ReminderModel.find({}).then((reminderList) => {
    if (reminderList) res.send(reminderList);
  })
})


app.post("/addReminder", async (req, res) => {
  const { reminderMsg, remindAt, reminderFreq } = req.body
  const reminder = new ReminderModel({
    reminderMsg,
    remindAt,
    reminderFreq
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