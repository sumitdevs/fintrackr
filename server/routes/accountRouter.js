import express from 'express';
import Account from '../models/Account.js';
import mongoose from 'mongoose';
import getuserId from '../utils/getuserId.js';
const accountRouter = express.Router();

accountRouter.get('/accounts', async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    try {
      const accounts = await Account.find({userId})
      .populate('userId');
      res.status(200).json(accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      res.status(500).json({ error: 'Failed to fetch accounts' });
    }
});

accountRouter.post('/accounts', async (req,res)=>{
  const token = req.cookies.token;
  const data= req.body;
  const userId = getuserId(token);
  createAccount(userId,data);
  res.status(200).json({ message: 'accounts created' });
});

accountRouter.delete('/accounts/:id', async (req,res)=>{
  const {id} = req.params;
  try {
    const deletedAccount = await Account.findByIdAndDelete(id);
    res.status(200).json({ message: "Account deleted successfully", account: deletedAccount });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

accountRouter.put('/accounts/:id', async (req,res)=>{
  const {id} = req.params;
  const {accountName, value, notes} = req.body;
  try{
    const updatedUser = await Account.findByIdAndUpdate(
      id, 
      {
        accountName: accountName,
        balance: value,
        accountDesc:notes
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(updatedUser);
  }catch (error){
    return res.status(404).send({ message: "User not found" });
  }
});



const createAccount = async (userId, data)=>{
    try{
        const account = new Account({
            accountName: data.accountName,
            balance: data.value,
            userId: userId,
            accountDesc:data.notes,
        });
        const saveAccount = await account.save();
        console.log(saveAccount);
    } catch(error){
        console.log(`Error creating account: ${error}`);
    }
}

export default accountRouter;