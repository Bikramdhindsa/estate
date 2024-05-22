import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

import session from 'express-session';
import listingRouter from './routes/listing.route.js'

dotenv.config();



mongoose.connect(process.env.MONGO) .then(()=>{
    console.log("connected to database");
}).catch(()=>{
    console.log("error connecting to database");
});


const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
const port = 3000;

app.listen(port, ()=>{
    console.log("server running on port 3000");
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/listing', listingRouter);




app.use((err, req, res, next) =>{
    const statusCode = err.statusCode|| 500 ;

    const message = err.message||"internal server error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});