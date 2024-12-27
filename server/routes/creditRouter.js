import express from 'express';
const creditRouter = express.Router();
import Credit from '../models/Credit.js';
import getuserId from '../utils/getuserId.js';
import catRouter from './catRouter.js';

creditRouter.get('/credit', async (req, res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    try{
        const creditcard = await Credit.find({user:userId});
        res.status(200).json(creditcard);
    } catch(error) {
        console.log(error);
    }
});

creditRouter.post('/credit', async (req, res)=>{ 
    const token = req.cookies.token;
    const userId = getuserId(token);
    const data = req.body;
    try{
        const credit = new Credit({...data, user:userId});
        const saveCredit = await credit.save();
        res.status(200).json({message:"creditcard created"});
        console.log(saveCredit);
    } catch(error){
    console.log(error);
 }
});

creditRouter.put('/credit/:id', async (req, res)=>{
    const {id} = req.params;
    const data = req.body;
    try{
        const updateCredit = await Credit.findByIdAndUpdate(
            id,
            {...data},
            {new:true}
        );
        res.status(200).json({message:"credit card updated successfully"});
    } catch(error){
        console.log(error);
    }
});

catRouter.delete('/credit/:id', async (req,res)=>{
    const {id} = req.params;
    try {
      const deletedAccount = await Credit.findByIdAndDelete(id);
      res.status(200).json({ message: "Account deleted successfully"});
    } catch (error) {
        console.log(error);
    }
  });

export default creditRouter;