// ✅ utils/helper.js
import moment from "moment";
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
export const getInitials=(name)=>{
  if(!name) return "";
  const words=name.split(" ");
  let initials="";
  for(let i=0;i<Math.min(words.length,2);i++){
    initials+=words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeparator=(num)=>{
  if(num==null ||isNaN(num)) return "";
  const [integerPart, fractionalPart]=num.toString().split(".");
const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart? `${formattedInteger}.${fractionalPart}`
  :formattedInteger;
};

export const prepareExpenseBarCharData=(data=[])=>{
  const charData=data.map((item)=>({
    category:item?.category,
    amount:item?.amount
  }));
  return charData;
}

export const prepareIncomeBarChartData=(data=[])=>{
  const sortedData=[...data].sort((a,b)=>new Date(a.date||a.createdAt)-new Date(b.date||b.createdAt));
  const chartData=sortedData.map((item)=>({
    category:moment(item?.date||item?.createdAt).format('DD-MM'),
    amount:item?.amount,
    source:item?.source,
  }));
  return chartData;
}
export const prepareExpenseLineChartData=(data=[])=>{
  const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const chartData=sortedData.map((item)=>({
    date:moment(item?.date).format('Do-MMM'),
    amount:item?.amount,
    category:item?.category,
  }));
  return chartData;
};