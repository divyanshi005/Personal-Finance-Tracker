import React,{useState,useEffect} from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import {useUserAuth} from '../../hooks/useUserAuth';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/DeleteAlert';
import ExpenseList from '../../components/Expense/ExpenseList';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
const Expense=()=>{
    useUserAuth();
     const[expenseData,setExpenseData]=useState([]);
        const [loading,setLoading]=useState(false);
        const [openDeleteAlert, setOpenDeleteAlert]=useState({
            show:false,
            data:null,
        });
        
        const [openAddExpenseModal, setOpenAddExpenseModal]=useState(false);
        //get all expense details
    const fetchExpenseDetails=async()=>{
        if(loading) return;
        setLoading(true);
        try{
            const response=await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
            );
            if(response.data){
                setExpenseData(response.data);
            }
        }catch(error){
            console.log("Something went wrong. Please try again",error);
        }finally{
            setLoading(false);
        }
    };

    //handle add expense
    const handleAddExpense=async(expense)=>{ 
        const {category,amount,date,icon}=expense;

        //validation checks
        if(!category.trim()){
            toast.error("Category is required.");
            return;
        }
        if(!amount||isNaN(amount)||Number(amount)<=0){
            toast.error("Amount should be a valid number greater than 0.")
            return;
        }
        if(!date){
            toast.error("Date is required.");
            return;
        }
        try{
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
                category,
                amount,
                date,
                icon,
            });
            setOpenAddExpenseModal(false);
            toast.success("Expense added sucessfully");
            fetchExpenseDetails();

        }catch(error){
            console.error(
                "Error adding expense:",
                error.response?.data?.message||error.message
            );
        }
     };

         //delet income
    const deleteExpense=async(id)=>{
        try{
            await axiosInstance.delete(`${API_PATHS.EXPENSE.DELETE_EXPENSE(id)}`);
            setOpenDeleteAlert({show:false,data:null});
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        }
        catch(error){
            console.error(
                "Error deleting expense:",
                error.response?.data?.message||error.message

            );
        }
    };

    //handle download expensedetails
    const handleDownloadExpenseDetails = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expense_details.xlsx");

    document.body.appendChild(link); // ✅ append to DOM
    link.click();
    document.body.removeChild(link); // ✅ remove after click
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading expenses:", error);
    toast.error("Failed to download expense details. Please try later");
  }
};

        

     useEffect(()=>{
        fetchExpenseDetails();
        return ()=>{
            
        }
     },[])

    return(
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                        transactions={expenseData}
                        onExpenseIncome={()=>setOpenAddExpenseModal(true)}
                        />

                    </div>
                    <ExpenseList
                    transactions={expenseData}
                    onDelete={(id)=>{
                        setOpenDeleteAlert({show:true,data:id});

                    }}
                    onDownload={handleDownloadExpenseDetails}/>
                </div>
                <Modal
                isOpen={openAddExpenseModal}
                onClose={()=>setOpenAddExpenseModal(false)}
                title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense}/>
                </Modal>
                
                <Modal
                isOpen={openDeleteAlert.show}
                onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                title="Delete Expense"
                >
                    <DeleteAlert
                    content="Are you sure you want to delete this expense details?"
                    onDelete={()=>deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>


            </div>
        </DashboardLayout>
        
    )
}
export default Expense;