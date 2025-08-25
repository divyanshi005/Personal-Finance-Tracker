import React,{useEffect,useState} from 'react';
import { prepareExpenseBarCharData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
const Last30DaysExpenses=({data})=>{
    const [charData, setCharData]=useState([]);
    useEffect(()=>{
        const result=prepareExpenseBarCharData(data);
          console.log("Chart Data:", result); // See if month, category, amount exist

        setCharData(result);
        return  ()=>{};
    },[data]
);
    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className='text-lg'>Last 30 days expenses</h5>
            </div>
            <CustomBarChart data={charData}/>
        </div>
    )
}
export default Last30DaysExpenses;