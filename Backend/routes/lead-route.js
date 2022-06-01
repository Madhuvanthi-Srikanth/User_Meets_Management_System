const express = require('express')
const bcrypt = require('bcryptjs')

const Lead = require('../schemas/lead-schema')
const Client = require('../schemas/client-schema')

const router = express.Router()

//all specializations


//new lead
router.post('/new1',(req,res)=>{
    console.log(req.body);
})
router.post('/new', async(req,res)=>{
    var user_details = req.body
   
    console.log(req.body.username);
    
    var existsUnameLead = await Lead.findOne({ username: req.body.username});
    var existsUnameCli= await Client.findOne({ username: req.body.username});
    try
    {
        if (existsUnameLead || existsUnameCli)
        {
            throw new Error('Username taken')
        }
        else
        {
            var user = await Lead.create(user_details)
            user.password = undefined
            res.send({status: 'success', ...user})
        }
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.errors, thrown : err.message})
    }

})

//edit lead
router.put('/update', async(req,res)=>{
    try
    {
        var user = await Lead.findOne({username: req.body.username})
        if(user)
        {
            var updated = await Lead.updateOne({username: req.body.username}, { $set: { ...req.body }})
            var user_new = await Lead.findOne({username: req.body.username})
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

//get details of all leads
router.get('/all', async(req, res)=>{
    try
    {
        var leads = await Lead.find({}, {password: 0})
        res.send({status: 'success', data: leads})
    }
    catch(err)
    {
        res.send({status: 'failed', message: err.message})
    }
})

router.get('/search/:spec/:search_str', async(req, res)=>{
    try
    {
        if(req.params.spec==='all')
        {
            var leads = await Lead.find({name: {$regex:  new RegExp(req.params.search_str), $options: 'i'}})
            res.send({status: 'success', data: leads})
        }
        else
        {
            var leads = await Lead.find({name: {$regex: new RegExp(req.params.search_str), $options: 'i'}, specialization: req.params.spec})
            res.send({status: 'success', data: leads})
        }
    }
    catch(err)
    {
        console.log(err);
        res.send({status: 'failed', message: err.message})
    }
})




//get details of one lead
router.get('/:username', async(req, res)=>{
    try
    {
        var user = await Lead.findOne({username: req.params.username}, {password:0, createdAt:0, _id:0, __v:0})
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

//lead login validation
router.post('/login', async(req,res)=>{
    var user_details = req.body
    console.log(user_details);
    console.log("HI");
    try
    {
        var user = await Lead.findOne({username: user_details.username})
        
        if(user)
        {
            if(bcrypt.compareSync(user_details.password, user.password))
            {
                user.password = undefined
                res.send({status: 'success', ...user})
            }
            else
            {
                throw new Error('Password does not match')
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