const express = require("express");
const bodyParser = require("body-parser")
const cors = require('cors');
const CryptoJS = require("crypto-js");

const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({collection: 'users' });
// const UserModel = mongoose.model('User',{},'users');
const UserModel = require("./User.js")
const DB = "mongodb+srv://singh:singh@cluster0.qiskiyr.mongodb.net/revitalize?retryWrites=true&w=majority";

mongoose.connect(DB).then(() => {
    console.log('connection successful');
}).catch((err) => console.log('no connection'));

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/users', async (req, res) => {
    const {name,age,gender,email, password} = req.body
    let userId = name.substring(0,3)
    userId = userId.trim()
    for (let i = 0; i < name.length; i++) 
    {
         if(name.charAt(i) == ' ')
         {
            userId = userId + name.charAt(i+1);
            break;
         }
    }
    userId = userId+age;

    // PASSWORD ENCRYPTION
    const key = "02090711"
    const encryptedPasscode = CryptoJS.AES.encrypt(password, key);

    const user = new UserModel({name,age,gender,email, encryptedPasscode,userId});
    user.save();
    console.log('User object:', user);  
    res.send(user);

});

app.get('/users', async (req,res) => {
    const users = await UserModel.find();
    res.send(users);
});

app.listen(5000,() => console.log("Backend is running"));

