const mongoose=require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conversation',
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },  
    text:{
        type:String,
    },
    read: {
        type: Boolean,
        default: false,
    },
    date:{
        type:Date,
    },
}, {
  timestamps: true
}
);

module.exports = mongoose.model('Message', MessageSchema);