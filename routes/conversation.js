const express=require('express');
const router=express.Router();
const Conversation=require('../models/conversation');

// créer ou récupérer une conversation entre 2 users
router.post('/create', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      return res.status(400).send("Missing users");
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
    conversation = await Conversation.create({
        participants: [senderId, receiverId], 
    });
    return res.status(201).json(conversation);
    } else {
    return res.status(200).json(conversation);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// récupérer conversations d’un user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate('participants', 'name')
      .populate({
        path: 'lastMessage',
        populate: { path: 'senderId', select: 'name' },
      })
      .sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports=router;