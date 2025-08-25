import react from 'react';
import moment from 'moment';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
const ExpenseList=({transactions,onDelete,onDownload})=>{
    return (
        <div>
            <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">
                Expense Sources
                </h5>
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base"/>Download
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                { 
                    transactions.map((expense) => (
                        <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.data).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={()=>onDelete(expense._id)}
                        />
                    ))
                }
            </div>
        </div>
        </div>
    )
}
export default ExpenseList;