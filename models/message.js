const mongoose=require('mongoose');

const Message=mongoose.model('Message',{
    context:{
        type:String,
    },
    date:{
        type:Date,
    }
});

module.exports=Message;