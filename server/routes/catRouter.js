import ExpenseCat from "../models/ExpenseCat.js";
import IncomeCat from "../models/IncomeCat.js";
import express from 'express';

const catRouter = express.Router();

catRouter.get('/expensecat', (req,res)=>{
    res.json({name:'expensecat'});
    fetchExpenseCat();
});

const createExpensecat = async ()=>{
    try{
        const expensecat = new ExpenseCat({
            name: "food/drink",
            subCat: ["bar", "eating out"]
        });
        const saveExpensecat = await expensecat.save();
        console.log(saveExpensecat);
    } catch(error){
        console.log('error happens : ', error);
    }
}

const fetchExpenseCat = async ()=>{
    try {
        const categories = await ExpenseCat.find();
        categories.forEach(category => {
            console.log(`Category: ${category.name}`);
            category.subCat.forEach(subcategory => {
                console.log(`- Subcategory: ${subcategory}`);
            });
        });
    } catch (error) {
        console.error("Error retrieving categories:", error);
    }
}

catRouter.get('/incomecat', (req,res)=>{
    res.json({name:'incomecat'});
    createIncomecat();
});

const createIncomecat = async ()=>{
    try{
        const incomecat = new IncomeCat({
            name: "income",
            subCat: ["salary", "odd jobs", "pension"]
        });
        const saveIncomecat = await incomecat.save();
        console.log(saveIncomecat);
    } catch(error){
        console.log('error happens : ', error);
    }
}

export default catRouter;