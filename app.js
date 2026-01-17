const express=require('express');

const UserRoutes=require('./routes/user');
const ItemRoutes=require('./routes/item');
const MessageRoutes=require('./routes/message');
const app=express();

require('dotenv').config();

require('./config/connect');

app.use(express.json());


app.use('/user',UserRoutes);
app.use('/item',ItemRoutes);
app.use('/message',MessageRoutes);

app.listen(3000,()=>{
    console.log('Server is running');
});
