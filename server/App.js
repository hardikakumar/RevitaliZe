require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var sha256 = require("js-sha256");          // For Encryption
const mongoose = require("mongoose");      // For Database

const DB = process.env.MONGO_DB_ID;

const UserModel = require("./User.js");
const QuesModel = require("./Ques.js");
const DoshaReportModel = require("./DoshaReport.js");
const RemediesModel = require("./Remedies.js");
const ReminderModel = require("./Reminder.js");
const HealthTipsModel = require("./HealthTips.js");
const FeedbacksModel = require("./Feedback.js");
const AvoidsModel = require("./Avoids.js");

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


// SIGN-UP FORM
app.post("/users", async (req, res) => {
  const { name, age, gender, email, phone, password } = req.body;
  UserModel.findOne({ email: email }).then((users) => {
    if (users) {
      res.status(403).send({ message: "User already registered" })
    }
    else {
      UserModel.findOne({ phone: phone }).then((users) => {
        if (users) {
          res.status(403).send({ message: "User already registered" })
        }
        else {
          encryptedPasscode = sha256(password);
          const user = new UserModel({
            name,
            age,
            gender,
            email,
            phone,
            encryptedPasscode,
          });

          user.save();
          console.log("User object:", user);
          res.send(user);
        }
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
        encryptedPasscode = sha256(password);
        if (encryptedPasscode === users.encryptedPasscode) {
          res.status(200).send(users);
        } else {
          res.status(400).send({ message: "Password didn't match" });
        }
      }
      else {
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
  const { vatta, pitta, kapha, member_id, date } = req.body;
  const doshareport = new DoshaReportModel({
    member_id,
    date,
    vatta,
    pitta,
    kapha,
  });
  doshareport.save();
  console.log(doshareport);
});


// FETCHING THE LATEST DOSHA REPORT OF THE PARTICULAR USER

app.post("/latestDoshaScore", async (req, res) => {
  const { member_id } = req.body;
  const report = await DoshaReportModel.find({ member_id: member_id })
  console.log(report);
  const l = report.length;
  res.send(report[l - 1]);
  // res.status(200).send(ques);
});

// FETCHING ALL THE DOSHA REPORTS OF THE PARTICULAR USERS

app.post("/DoshaReports", async (req, res) => {

  const { member_id } = req.body;
  const reports = await DoshaReportModel.find({ member_id: member_id })
  res.send(reports);

})

// GET FEATURE TO CHECK THE LATEST 
app.get("/Dosha", async (req, res) => {
  const { member_id } = req.body;
  const reports = await DoshaReportModel.find({ member_id: member_id })
  console.log(reports);
  const l = reports.length;
  res.send(reports[l - 1]);
});


// REMEDIES

// TO POST REMEDIES FROM THE DOCTOR PANEL INTO THE DATABASE
app.post("/Remedies", async (req, res) => {
  const { RemedyName, Description, Eczema, Hyperthyroidism, Hypothyroidism, PCOD, Type, Dosha } = req.body;

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

// TO FETCH REMEDIES TO DISPLAY THE REQUIRED REMEDIES FOR THE USER

app.post("/remedy", async (req, res) => {
  const { member_id, E, P, R, H, N } = req.body;
  // const kScore = 6;
  // const pScore = 7;
  // const vScore = 3;


  const doshas = await DoshaReportModel.find({ member_id: member_id });

  let kScore = doshas.kapha, pScore = doshas.pitta, vScore = doshas.vatta;

  let Kr = 0, Pr = 0, Vr = 0;
  var max;


  const min = 0;

  // NESTED IF-ELSE TO COMPUTE THE REMEDY ACCORDING TO THE KAPHA DOSHA SCORE

  if (kScore < 3) {
    Kr = 1;
  }
  else if (kScore <= 5) {
    Kr = 2;
  }
  else if (kScore <= 8) {
    Kr = 3;
  }
  else {
    Kr = 4;
  }

  // NESTED IF-ELSE TO COMPUTE THE REMEDY ACCORDING TO THE PITTA DOSHA SCORE

  if (pScore < 3) {
    Pr = 1;
  }
  else if (pScore <= 5) {
    Pr = 2;
  }
  else if (pScore <= 8) {
    Pr = 3;
  }
  else {
    Pr = 4;
  }


  // NESTED IF-ELSE TO COMPUTE THE REMEDY ACCORDING TO THE VATA DOSHA SCORE

  if (vScore < 3) {
    Vr = 1;
  }
  else if (vScore <= 5) {
    Vr = 2;
  }
  else if (vScore <= 8) {
    Vr = 3;
  }
  else {
    Vr = 4;
  }

  let pitta = {}, vata = {}, kapha = {};

  console.log(E);
  if (E) {
    kapha = await RemediesModel.find({ Dosha: "k" }, { Eczema: false });
    vata = await RemediesModel.find({ Dosha: "v" }, { Eczema: false });
    pitta = await RemediesModel.find({ Dosha: "p" }, { Eczema: false });
  }
  else if (R) {
    kapha = await RemediesModel.find({ Dosha: "k" }, { Hyperthyroidism: false });
    vata = await RemediesModel.find({ Dosha: "v" }, { Hyperthyroidism: false });
    pitta = await RemediesModel.find({ Dosha: "p" }, { Hyperthyroidism: false });
  }
  else if (H) {
    kapha = await RemediesModel.find({ Dosha: "k" }, { Hypothyroidism: false });
    vata = await RemediesModel.find({ Dosha: "v" }, { Hypothyroidism: false });
    pitta = await RemediesModel.find({ Dosha: "p" }, { Hypothyroidism: false });
  }
  else if (P) {
    kapha = await RemediesModel.find({ Dosha: "k" }, { PCOD: false });
    vata = await RemediesModel.find({ Dosha: "v" }, { PCOD: false });
    pitta = await RemediesModel.find({ Dosha: "p" }, { PCOD: false });
  }
  else if (N) {
    kapha = await RemediesModel.find({ Dosha: "k" });
    vata = await RemediesModel.find({ Dosha: "v" });
    pitta = await RemediesModel.find({ Dosha: "p" });
  }
  else {
    kapha = await RemediesModel.find({ Dosha: "k" });
    vata = await RemediesModel.find({ Dosha: "v" });
    pitta = await RemediesModel.find({ Dosha: "p" });
  }


  var result = {};
  var types = {};

  const values = { "f": 10, "v": 10, "g": 10, "n": 5, "o": 4, "s": 10 };


  // for(key in values)
  // {
  //   console.log(values[key]);
  // }

  // var fruit, veg, grain, oil, spices, nuts, max;
  // fruit = pitta.filter(obj => obj.Type == 'f')
  // veg = pitta.filter(obj => obj.Type == 'v')


  var tp;

  // FOR PITTA DOSHA

  for (key in values) {
    types[key] = pitta.filter(obj => obj.Type == key)
  }

  for (let i = 1; i <= Pr; i++) {
    for (key in values) {
      max = values[key];
      let count = Math.floor(Math.random() * (max - min + 1)) + min;
      tp = types[key];
      result[tp[count].RemedyName] = tp[count].Description;
    }
  }



  // FOR KAPHA DOSHA

  for (key in values) {
    types[key] = kapha.filter(obj => obj.Type == key)
  }

  for (let i = 1; i <= Kr; i++) {
    for (key in values) {
      max = values[key];
      let count = Math.floor(Math.random() * (max - min + 1)) + min;
      tp = types[key];
      result[tp[count].RemedyName] = tp[count].Description;
    }
  }


  // FOR VATA DOSHA

  for (key in values) {
    types[key] = vata.filter(obj => obj.Type == key)
  }

  for (let i = 1; i <= Vr; i++) {
    for (key in values) {
      max = values[key];
      let count = Math.floor(Math.random() * (max - min + 1)) + min;
      tp = types[key];
      result[tp[count].RemedyName] = tp[count].Description;
    }
  }

  res.send(result);

})


//REMINDERS
setInterval(() => {
  ReminderModel.find({}).then((reminderList) => {
    if (reminderList) {
      reminderList.forEach(reminder => {
        const now = new Date()
        var reminderTime = new Date(reminder.remindAt);
        if ((reminderTime - now) < 0) {
          reminderTime.setHours(reminderTime.getHours() + reminder.reminderFreq);
          ReminderModel.findByIdAndUpdate(reminder._id, { remindAt: reminderTime }).then((remindObj) => {
            const accountSid = process.env.WHATSAPP_ACCOUNT_SID;
            const authToken = process.env.WHATSAPP_AUTH_TOKEN;
            const client = require('twilio')(accountSid, authToken);

            client.messages
              .create({
                body: "A reminder from RevitaliZe: *" + reminder.reminderMsg + "*",
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+91##########'
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


app.post("/getAllReminder", (req, res) => {
  const { member_id } = req.body

  ReminderModel.find({ member_id: member_id }).then((reminderList) => {
    if (reminderList) res.send(reminderList);
  })
})


app.post("/addReminder", async (req, res) => {
  const { reminderMsg, remindAt, reminderFreq, member_id } = req.body
  const reminder = new ReminderModel({
    reminderMsg,
    remindAt,
    reminderFreq,
    member_id
  })

  reminder.save();
  ReminderModel.find({ member_id }).then((reminderList) => {
    if (reminderList) {
      res.send(reminderList);
    }
  })
})

app.post("/deleteReminder", (req, res) => {
  const { reminder_id, member_id } = req.body
  ReminderModel.deleteOne({ _id: reminder_id }).then(() => {
    ReminderModel.find({ member_id }).then((reminderList) => {
      if (reminderList) {
        res.send(reminderList)
      }
    }).catch((err) => {
      console.log(err);
    });
  })
})

//FEEDBACKS

// Feedbacks written by the user

app.post("/UserFeedbacks", async (req, res) => {

  const { member_id, feedbackMsg } = req.body;
  const user_details = await UserModel.find({ member_id: member_id })
  const member_name = user_details.name;
  const feedbacks = new FeedbacksModel({
    member_id,
    member_name,
    feedbackMsg,
  });

  feedbacks.save();
  res.send(feedbacks);
})

// Feedbacks displayed on the doctor panel side

app.post("/DoctorFeedbacks", async (req, res) => {
  const feedbacks = await FeedbacksModel.find()
  res.status(200).send(feedbacks);
})

app.listen(5000, () => console.log("Backend is running"));

app.post("/avoids",async (req,res) => 
{
    const {member_id} = req.body;
    const doshas = await DoshaReportModel.find({member_id:member_id});
    const pScore = doshas.pitta, kScore = doshas.kapha, vScore = doshas.vatta;

    // const pScore = 6, kScore = 3, vScore = 6;
    const avoid = await AvoidsModel.find();
    var final = [];
    const p = 0, k = 1,v = 2;
    if(pScore > kScore && pScore > vScore)
    {
       final.push(avoid[p]);
    }
    else if(kScore > pScore && kScore > vScore)
    {
      final.push(avoid[k]);
    }
    else if(vScore > kScore && vScore > pScore)
    {
      final.push(avoid[v]);
    }
    else 
    {
      if(pScore === kScore && pScore === vScore)
      {
        final.push(avoid[p]);
        final.push(avoid[k]);
        final.push(avoid[v]);
      }
      else
      {
       if(pScore === kScore)
       {
        final.push(avoid[p]);
        final.push(avoid[k]);
       }
       else if(vScore === kScore)
       {
        final.push(avoid[k]);
        final.push(avoid[v]);
       }
       else (pScore == vScore)
       {
        final.push(avoid[p]);
        final.push(avoid[v]);
       }
      }
    }
    res.send(final);

})