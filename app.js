const express=require('express');
const cors=require('cors');
const UserRoutes=require('./routes/user');
const ItemRoutes=require('./routes/item');
const MessageRoutes=require('./routes/message');
const ConversationRoutes=require('./routes/conversation');
const app=express();

require('dotenv').config();

require('./config/connect');
app.use(cors());

app.use(express.json());


app.use('/user',UserRoutes);
app.use('/item',ItemRoutes);
app.use('/message',MessageRoutes);
app.use('/conversation',ConversationRoutes);
app.use('/uploads',express.static('uploads'));

app.listen(4000,()=>{
    console.log('Server is running');
});
