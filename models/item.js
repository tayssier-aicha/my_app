const mongoose=require('mongoose');

const Item=mongoose.model('Item',{
    type:{
        type:String,
        enum:['lost','found']
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
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',            
    required: true          
  }
},{
  timestamps: true
});

module.exports=Item;