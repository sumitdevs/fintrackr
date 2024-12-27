import Transaction from '../models/Transaction.js';
import getuserId from '../utils/getuserId.js';
import express from 'express';

const transactionRouter = express.Router();

transactionRouter.get('/transaction',async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    try{
        const data = await Transaction.find({user:userId});
        res.status(200).json(data);
    }catch(error){
        console.log(error);
    }
});

transactionRouter.delete('/transaction/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const deleteTransaction = await Transaction.findByIdAndDelete(id);
        res.status(200).json({message:'account deleted'});
    } catch(error){
        console.log(error)
    }

});

transactionRouter.put('/transaction/:id', async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    const {id} = req.params;
    const data = req.body;
    try{
        const updateTransaction = await Transaction.findByIdAndUpdate(
            id,
            {
                user: userId,
                account:data.account,
                category: data.category,
                amount: data.value,
                date: data.date,
                time: data.time,
                type:data.type,
                notes: data.notes
            },
            {new:true}
        );
        res.status(200).json({message:'account deleted'});
    } catch(error){
        console.log(error)
    }

});

transactionRouter.get('/income',async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    try{
        const data = await Transaction.find({user:userId, type:'income'});
        res.status(200).json(data);
    }catch(error){
        console.log(error);
    }
});

transactionRouter.post('/income', async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    const data = req.body;
    try{
        const income = new Transaction({
            user: userId,
            account:data.account,
            category: data.category,
            amount: data.value,
            date: data.date,
            time: data.time,
            type:data.type,
            notes: data.notes
        });
        const saveIncome = await income.save();
        console.log(saveIncome);
        res.status(200).json({message:"income added"});
    }catch(error) {
        console.log(error);
    }
});

transactionRouter.get('/expense', async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    try{
        const expense = await Transaction.find({user:userId, type:'expense'});
        res.status(200).json(expense);
    } catch(error){
        console.log(error);
    }
});

transactionRouter.post('/expense',async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    const data = req.body;
    try{
        const expense = new Transaction({
            user: userId,
            account:data.account,
            category: data.category,
            amount: data.value,
            date: data.date,
            time: data.time,
            type:data.type,
            notes: data.notes
        });
        const saveExpense = await expense.save();
        console.log(saveExpense);
        res.status(200).json({message:"expense added"});
    } catch(error){
        console.log(error);
    }  
});

export default transactionRouter;