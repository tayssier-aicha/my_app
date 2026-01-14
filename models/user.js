const mongoose=require('mongoose');

const User=mongoose.model('User',{
    id:{
        type:String,
    },
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    verificationtoken:{
        type: String,
    }    
});

module.exports=User;