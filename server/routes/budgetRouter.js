import Budget from "../models/Budget.js";
import express from 'express';
import getuserId from "../utils/getUserid.js";

const budgetRouter = express.Router();

budgetRouter.get('/budget', async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    try{
        const data = await Budget.find({userId});
        res.status(200).json(data);
    } catch(error){
        console.log(error);
    }
});

budgetRouter.post('/budget', async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    const data = req.body;
    try{
        const budget = new Budget({
            amount:data.amount,
            userId:userId,
            account:data.account,
            category:data.category,
            timeFrames:data.duration
        });
        const saveBudget = await budget.save();
        res.status(200).json({message:"budget created"})
        console.log(saveBudget);
    } catch(error){
        console.log(error);
    }
});

budgetRouter.put('/budget/:id', async (req,res)=>{
    const {id}  = req.params;    
    const data = req.body;
    try{
        const updateBudget = await Budget.findByIdAndUpdate(
            id,
            {
            amount:data.amount,
            account:data.account,
            category:data.category,
            timeFrames:data.duration
            },
            {new:true}
        );
        res.status(200).json(updateBudget);
    } catch(error){
        console.log(error);
    }
});

budgetRouter.delete('/budget/:id', async (req, res)=>{
    const {id} = req.params;
    console.log(id);
    try{
        const deleteBudget = await Budget.findByIdAndDelete(id);
        res.status(200).json({message:'deleted successfully'});
    } catch(error){
        console.log(error);
    }
});

export default budgetRouter;