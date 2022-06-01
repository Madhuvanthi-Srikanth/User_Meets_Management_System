const express = require('express')
const bcrypt = require('bcryptjs')

const Client = require('../schemas/client-schema')
const Lead = require('../schemas/lead-schema')

const router = express.Router()


//new client
router.post('/new', async(req,res)=>{
    
    var user_details = req.body
    // delete user_details.qualifications
    // delete user_details.specialization
    var existsUnameLead = await Lead.findOne({ username: req.body.username});
    var existsUnameCli = await Client.findOne({ username: req.body.username});
    try
    {
        if (existsUnameLead || existsUnameCli)
        {
            throw new Error('Username taken')
        }
        else
        {
            var user = await Client.create(user_details)
            user.password = undefined
            res.send({status: 'success', ...user})
            console.log("created");
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.errors, thrown : err.message})
    }

})

//edit client
router.put('/update', async(req,res)=>{
    try
    {
        var user = await Client.findOne({username: req.body.username})
        if(user)
        {
            var updated = await Client.updateOne({username: req.body.username}, { $set: { ...req.body }})
            var user_new = await Client.findOne({username: req.body.username})
            user_new.password = undefined
            res.send({status: 'success', ...user_new})
        }
        else
        {
            throw new Error('User does not exist')
        }
    
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }

})

//get details of one client
router.get('/:username', async(req, res)=>{
    try
    {
        var user = await Client.findOne({username: req.params.username},{password:0, createdAt:0, _id:0, __v:0})
        if(user)
        {
            res.send({status: 'success', ...user})
        }
        else
        {
            throw new Error('User does not exist')
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

//client login validation
router.post('/login', async(req,res)=>{
    var user_details = req.body
    console.log(user_details);
    try
    {
        var user = await Client.findOne({username: user_details.username})
        if(user)
        {
            if(bcrypt.compareSync(user_details.password, user.password))
            {
                user.password = undefined
                res.send({status: 'success', ...user})
            }
            else
            {
                throw new Error('Passwords do not match')
            }
        }
        else
        {
            throw new Error('User does not exist')
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.errors, thrown : err.message})
    }

})






module.exports = router