import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import express from 'express';

const transactionRouter = express.Router();

transactionRouter.get('/income',(req,res)=>{
    res.json({name:"income"});
});

transactionRouter.get('/expense',(req,res)=>{
    res.json({name:"expense"});
});

export default transactionRouter;