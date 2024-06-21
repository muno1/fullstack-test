//Expense model
const mongoose=require('mongoose');
//Expense schema with amount and title fields
const expenseSchema=new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Expense=mongoose.model('Expense',expenseSchema);
//export the Expense model
module.exports=Expense;