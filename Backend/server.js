const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')

const leads = require('./routes/lead-route');
const clients = require('./routes/clients-route');
const feedbacks = require('./routes/feedbacks-route');
const meets = require('./routes/meets-route');
const admins = require('./routes/admins-route')

const Lead = require('./schemas/lead-schema')
const Client = require('./schemas/client-schema');


const dburl = 'mongodb+srv://admin:root@cluster0.ciln6.mongodb.net/USERMANAGEMENT?retryWrites=true&w=majority'
mongoose.connect(dburl, ()=> console.log('Connected to db'), (err)=>console.log(err))

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
}));

app.use('/lead', leads)
app.use('/client', clients)
app.use('/feedback', feedbacks)
app.use('/meets', meets)
app.use('/admin', admins)

//nodemailer for forgot password
app.post('/forgot-password', async(req, res)=>{
    var details = req.body
    try
    {
        var user_lead = Lead.findOne({username: details.username})
        var user_cli = Client.findOne({username: details.username})
        if(user_lead || user_cli)
        {
            var code = Math.floor(Math.random()*(99999-10000))+ 10000
            //nodemailer workflow
            //let testAccount = await nodemailer.createTestAccount();
            //console.log(testAccount);
            let transporter = nodemailer.createTransport({
                service: 'gmail' ,
                auth: { 
                    user: 'madhuvanthi21820@gmail.com',
                    pass: 'passkey'
                }
            });

            let info = await transporter.sendMail({
                from: "madhuvanthi21820@gmail.com",
                to: details.email,
                subject: "Password reset",
                text: `The code for password reset is ${code}. Please enter this code in the app to reset your password.`
            });

            console.log('Message sent--', info.messageId);
            res.send({status: 'success', code: `${code}`})
        }
        else
        {
            throw new Error('User does not exist')
        }
        res.send()
    {
        
    }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.error, thrown: err.message})
    }
})

app.listen(3000, ()=>{
    console.log('Listening on 3000');
})