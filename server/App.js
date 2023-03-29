const express = require("express");
const bodyParser = require("body-parser")
const cors = require('cors');

var sha256 = require('js-sha256');      // For Encryption

const mongoose = require('mongoose');    // For Database
// const userSchema = new mongoose.Schema({collection: 'users' });
// const UserModel = mongoose.model('User',{},'users');

const UserModel = require("./User.js")
const QuesModel = require("./Ques.js")
const DB = "mongodb+srv://singh:singh@cluster0.qiskiyr.mongodb.net/revitalize?retryWrites=true&w=majority";

mongoose.connect(DB).then(() => {
    console.log('connection successful');
}).catch((err) => console.log('no connection'));

const app = express();
app.use(cors());
let items;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SIGNU-UP FORM 
app.post('/users', async (req, res) => {
    const { name, age, gender, email, password } = req.body
    let userId = name.substring(0, 3)
    userId = userId.trim()
    for (let i = 0; i < name.length; i++) {
        if (name.charAt(i) == ' ') {
            userId = userId + name.charAt(i + 1);
            break;
        }
    }
    userId = userId + age;

    encryptedPasscode = sha256(password);

    const user = new UserModel({ name, age, gender, email, encryptedPasscode, userId });
    user.save();
    console.log('User object:', user);
    res.send(user);

});

// LOGIN FORM 
app.post("/userLogin", async (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then((users) => {

        if (users) {

            console.log(password);
            console.log(users.encryptedPasscode);
            console.log(users);
            encryptedPasscode = sha256(password);
            if (encryptedPasscode === users.encryptedPasscode) {
                res.send(users.name);
                res.status(200).send({ message: "Login Successfull" })
            } else {
                res.status(400).send({ message: "Password didn't match" })
            }
        } else {
            res.status(404).send({ message: "User not registered" })
        }
    }).catch(err => {
        console.log(err);
    })
})

app.get('/users', async (req, res) => {
    const users = await UserModel.find();
    res.send(users);
});

app.post('/questionnaire', (req, res) => {
    const { idx } = req.body;
    console.log(idx)
    QuesModel.findOne({ "idx": idx }).then((questionnaire) => {

        console.log(questionnaire)
        if (questionnaire) {
            res.status(200).send(questionnaire);
        }
        else {
            res.status(404).send("Error")
        }

    }).catch(err => {
        console.log(err);
        res.send(404)
    })
    // res.send(200)

});

app.listen(5000, () => console.log("Backend is running"));