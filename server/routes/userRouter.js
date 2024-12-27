import express from 'express';
import User from '../models/User.js';
import getuserId from '../utils/getuserId.js';

const userRouter = express.Router();

userRouter.get('/user', async (req, res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    try{
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch(error){
        console.log(error);
    }
});

userRouter.put('/user/:id', async (req,res)=>{
    const {id} = req.params;
    const data = req.body;
    try{
        const updateUserName = await User.findByIdAndUpdate(id, data, {new:true});
        res.status(200).json({message:'user updated'});
    } catch(error){
        console.log(error);
    }
})
export default userRouter;