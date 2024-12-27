import express from 'express';
const debtsRouter = express.Router();
import Debt from '../models/Debt.js';
import getuserId from '../utils/getuserId.js';

debtsRouter.get('/debts', async (req, res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    try{
        const debt = await Debt.find({user:userId});
        res.status(200).json(debt);
    } catch(error){
        console.log(error);
    }
});

debtsRouter.post('/debts', async (req, res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    const data = req.body;
    try{
        const debt = new Debt({...data,user:userId});
        const saveDebt = await debt.save();
        res.status(200).json({message: "debt created"});
        console.log(saveDebt);
    } catch(error){
        console.log(error);
    }
});

debtsRouter.put('/debts/:id', async (req, res)=>{
    const {id} = req.params;
    const data = req.body;
    try{
        const updateDebt = await Debt.findByIdAndUpdate(
            id,
            {...data},
            {new:true}
        );
        res.status(200).json({message:"credit card updated successfully"});
    } catch(error){
        console.log(error);
    }
});

debtsRouter.delete('/debts/:id', async (req,res)=>{
    const {id} = req.params;
    try {
      const deleteDebt = await Debt.findByIdAndDelete(id);
      res.status(200).json({ message: "Account deleted successfully"});
    } catch (error) {
        console.log(error);
    }
  });

export default debtsRouter;