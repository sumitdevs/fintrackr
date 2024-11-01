import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));


connectDB();

app.get('/', (req,res)=>{
    res.send("hello world");
});

app.use('/', authRoutes);


app.listen(PORT, ()=>{
    console.log(`server is runnig on http://localhost:${PORT}/`)
});