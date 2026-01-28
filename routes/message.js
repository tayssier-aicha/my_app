const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const Conversation = require('../models/conversation');

//envoyer un message
router.post('/send', async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;

    if (!conversationId || !senderId || !text) {
      return res.status(400).send("Missing fields");
    }

    // vérifier si la conversation existe
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).send("Conversation not found");
    }
    const message = await Message.create({
      conversationId,
      senderId,
      text,
    });

    res.status(201).send(message);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// récupérer messages d’une conversation
router.get('/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId })
      .populate('senderId', 'name')
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
