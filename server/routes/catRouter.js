
import Category from "../models/Category.js";
import express from 'express';
import getuserId from "../utils/getUserid.js";

const catRouter = express.Router();

catRouter.get('/category', async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    try {
        const categories = await Category.find({userId});
        res.json(categories);
    } catch (error) {
        console.error("Error retrieving categories:", error);
    }
});

catRouter.post('/category', async (req,res)=>{
    const token = req.cookies.token;
    const userId = getuserId(token);
    const {type, name, subCat} = req.body;
    createCategory(userId, type, name, subCat,res);
});

catRouter.put('/category/:id', async (req,res)=>{
    const {id} = req.params;
    const  {type, name, subCat} = req.body;
    try{
        const updateCategory =  await Category.findByIdAndUpdate(id,{
            $set: {
                type:type,
                name: name,
                subCat: subCat
            }
        },  { new: true, runValidators: true });
        
        res.status(200).json({
            message: "Category updated successfully",
          });

    }catch(error){
        console.log(error)
    }
})

catRouter.delete('/category/:id', async (req,res)=>{
    const {id} = req.params;
    try{
      const deleteCat = await Category.findByIdAndDelete(id);
      if(!deleteCat) res.status(404).json({message:"category not found!"});
      res.status(200).json({message:"category deleted"});
    } catch(error){
        console.log(error);
    }
})

const createCategory = async (Id, type, name, subCat,res)=>{
    try{
        const category = new Category({
            userId: Id,
            type:type,
            name: name,
            subCat: subCat
        });
        const saveCategory = await category.save();
        res.status(200).json({message:"category created"});
        console.log(saveCategory);
    } catch(error){
        res.status(201).json({message:"category already exist"});
    }
}





export default catRouter;