import express from 'express';
import Setting from '../models/Settings.js';
import getuserId from '../utils/getuserId.js';

const settingRouter = express.Router();

settingRouter.get('/setting',async (req,res)=>{
    const token = req.cookies.token;
    const id = getuserId(token);
    try{
        const setting = await Setting.find({user:id});
        res.status(200).json(setting);
    }catch(error){
        console.log(error);
    }
});

settingRouter.post('/setting', async (req,res)=>{
    const token = req.cookies.token;
    const id = getuserId(token);
    const data = req.body;
    try{
        const setting = new Setting({user:id, ...data});
        const saveSetting = await setting.save();
        res.status(200).json(saveSetting);
    } catch(error) {
        console.log(error);
    }
})

settingRouter.put('/setting/:id', async (req,res)=>{
    const {id} = req.params;
    const data = req.body;
    try{
        const updatedSetting = await Setting.findByIdAndUpdate(id, data, {new:true});
    }catch(error){
        console.log(error);
    }
});

export default settingRouter;