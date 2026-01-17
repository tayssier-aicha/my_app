const mongoose=require('mongoose');

const Item=mongoose.model('Item',{
    type:{
        type:String,
    },
    description:{
        type:String,
    },
    location:{
        type:String,
    },
    date:{
        type:Date,
    },
    image:{
        type:String,
    }
});

module.exports=Item;