const express=require('express'); 
const router=express.Router(); 
const User=require('../models/user'); 
const bcrypt=require('bcrypt'); 
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');

async function sendVerificationEmail(email,token,subject,html){
    const transporter=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:process.env.EMAIL_USER,
                    pass:process.env.EMAIL_PASS
                }
            });

            await transporter.sendMail({
                from:process.env.EMAIL_USER,
                to:email,
                subject:`${subject}`,
                html:`${html}`
            });
};


// Add a new user 
router.post('/add',async(req,res)=>{
    try{ 
        data= req.body; 
        const email_exist = await User.findOne({email:data.email}); 
        const id_exist= await User.findOne({id:data.id}); 
        if (email_exist||id_exist){ 
            res.status(401).send("email or id already exists"); 
        } 
        else{ 
            //genrate token
            const token=crypto.randomBytes(32).toString('hex');

            const usr=new User(data); 
            
            usr.verificationtoken=token;

            //function to hash password
            salt=bcrypt.genSaltSync(10); 
            cryptpass=await bcrypt.hashSync(data.password,salt); 
            usr.password=cryptpass;

            const url=process.env.VERIFY+token;
            const html=`<h3>Click to verify</h3><a href="${url}">${url}</a>`;
            //function to config email
            await sendVerificationEmail(usr.email,token,'Verify your email',html);

            res.status(200).send("Verification email sent");
            users=await usr.save();
        } 

    } 
    catch(err){ 
        console.log(err);
        res.status(400).send({ message: "Error in adding user", error: err });
    } 
}); 

// Verify with URL
router.get('/verify/:token',async(req,res)=>{
    try{
        const token=req.params.token;
        const user=await User.findOne({verificationtoken:token});
        if(!user){
            res.status(400).send("Invalid token");
        }
        else{
            user.isVerified=true;
            user.verificationtoken=undefined;
            res.status(200).send("Email verified successfully");
            await user.save();
        }
    }
    catch(err){
        res.status(400).send(err);
    }
});

 //login user 
 router.post('/login',async(req,res)=>{
     try{ 
        data=req.body; 
        user=await User.findOne({email:data.email}); 
        if(!user){
             res.status(401).send("Invalid email or password"); 
        } 
        else{
             validpass=await bcrypt.compareSync(data.password,user.password); 
             if(!validpass){
                 res.status(401).send("Invalid email or password"); 
             } 
             else{
                payload={
                    _id:user.id,
                    email:user.id,
                    password:user.password

                }
                token=jwt.sign(payload,process.env.JWT_SECRET);
                res.status(200).send("login seccessful");
              } 
            } 
     } 
     catch(err){ res.status(401).send(err); 

     } 
    });

// Get all users 
router.get('/getall',async(req,res)=>{ 
    try{ 
       users=await User.find();
        res.status(200).send(users);
   } 
    catch(err){ 
        res.status(400).send(err);    
}
}); 

// Get user by ID 
router.get('/get/:id',async(req,res)=>{ 
    try{ 
        id=req.params.id; 
        users=await User.findOne({_id:id}); 
        res.status(200).send(users); 
    }
    catch(err){ 
        res.status(400).send(err); 
    } 
}); 

// Update user by ID 
router.put('/update/:id',async(req,res)=>{
    try{ 
        id=req.params.id; 
        data=req.body;  
        user=await User.findByIdAndUpdate({_id:id},data);
         if(!user){
            res.status(404).send("user not found");
        }
        else{
            if (data.password){
                salt=bcrypt.genSaltSync(10); 
                cryptpass=await bcrypt.hashSync(data.password,salt); 
                user.password=cryptpass;
                await user.save();
                res.status(200).send(user); 
            }
            else{
                res.status(200).send(user); 
            }
        }
    } 
    catch(err){ 
        console.log(err);
        res.status(400).send(err); 
    } 
}); 

// Delete user by ID 
router.delete('/delete/:id',async(req,res)=>{ 
    try{ 
        id=req.params.id; 
        user=await User.findByIdAndDelete({_id:id});
        if(!user){
            res.status(404).send("user not found");
        }
        else{
            res.status(200).send(users); 
        }
    } 
    catch(err){ 
        res.status(400).send(err); 
    } 
});
module.exports=router;