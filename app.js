const express=require('express');

const UserRoutes=require('./routes/user');
const app=express();

require('dotenv').config();

require('./config/connect');

app.use(express.json());
app.use('/user',UserRoutes);

app.listen(3000,()=>{
    console.log('Server is running');
});
