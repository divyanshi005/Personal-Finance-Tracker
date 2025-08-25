import react,{useState,useEffect} from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
const COLORS=["#875CF5","#FA2C37","#FF6900","#4F39F6"]
const RecentIncomeWithChart=({data,totalIncome})=>{
    const [charData,setChartData]=useState([]);
    const prepareChartData=()=>{
        const dataArr=data?.map((item)=>({
            name:item?.source,
            amount:item?.amount
        }))||[];
        
        setChartData(dataArr);
    }
       useEffect(() => {
        prepareChartData();
    }, [data]); // re-run when `data` changes
    return (
        <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 60 days income</h5>
        </div>
        

        <CustomPieChart
        data={charData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
    colors={COLORS}
        />
        </div>
    )
}
export default RecentIncomeWithChart;