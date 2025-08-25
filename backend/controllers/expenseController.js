const xlsx=require('xlsx')
const Expense=require('../models/Expense')


//add expense service
exports.addExpense=async (req, res) => {
    const userId=req.user.id;

    try{
        const{category,amount,date}=req.body;

        //Validation:Check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields are required"});
    }

    const newExpense=new Expense({
        userId,
        category,
       
        amount,
        date:new Date(date)
    });

    await newExpense.save();
    res.status(200).json(newExpense);
}
catch(err){
    res.status(500).json({message:"Server Error"});
}}

//get all income source
exports.getAllExpense=async (req, res) => {
    const userId=req.user.id;
    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        res.json(expense);
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
};

//delete income source
exports.deleteExpense=async (req, res) => {
    // const userId=req.user.id;
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully"});
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
};

//download income as excel
exports.downloadExpenseExcel=async (req, res) => {
    const userId=req.user.id;
    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        // res.json(income);
//Convert to excel
        const data=expense.map((item)=>({
            Category:item.category,
            Amount:item.amount,
            Date:item.date,
        }));
        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb,'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
};