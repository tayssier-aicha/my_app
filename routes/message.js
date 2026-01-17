const express=require('express');
const router=express.Router();
const Message=require('../models/message');

router.post('/add',async (req,res)=>{
    try{
        const data=req.body;
        const message=new Message(data);
        const saveMessage=await message.save();
        res.status(200).send(saveMessage);
    }
    catch(err){
        console.log("------------>"+err);
        res.status(400).send(err);
    }
});

router.get('/getall',async(req,res)=>{
    try{
        messages=await Message.find();
        res.status(200).send(messages);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});



module.exports=router;