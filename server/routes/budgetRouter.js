import Budget from "../models/Budget.js";
import express from 'express';

const budgetRouter = express.Router();

budgetRouter.get('/budget', (req,res)=>{
    res.json({name: "budget"})
});

export default budgetRouter;