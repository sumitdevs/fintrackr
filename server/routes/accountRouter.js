import express from 'express';
import Account from '../models/Account.js';
import jwt from 'jsonwebtoken';


const accountRouter = express.Router();

accountRouter.get('/accounts', async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    try {
      const accounts = await Account.find({userId}).populate('userId');
      res.status(200).json(accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      res.status(500).json({ error: 'Failed to fetch accounts' });
    }
});

const getuserId = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET,  (err, data) => {
        if (err) {
          console.log(err);
        } else {
          return (data.id);
        }
      });
}

const createAccount = async (userId)=>{
    try{
        const account = new Account({
            accountName: 'bank of allahbad',
            balance: 5000,
            userId: userId,
            accountDesc:'This is sbi saving account where all my income and expense are keep'
        });
        const saveAccount = await account.save();
        console.log(saveAccount);
    } catch(error){
        console.log(`Error creating account: ${error}`);
    }
}

export default accountRouter;