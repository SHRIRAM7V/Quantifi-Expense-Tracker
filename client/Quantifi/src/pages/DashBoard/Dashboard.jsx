import React, { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import FinancialRecordForm from "./financial-record-form";
import { useFinancialRecordContext } from "../../context/financial-record-context";
import FinancialRecordList from "./financial-record-list";
import "./dashboard.css"; // Assuming you have a CSS file for styling
const Dashboard = () => {
  const { user } = useUser();

  const { records } = useFinancialRecordContext();
  const totalmonthly = useMemo(() => {

    let totalcost = 0;
    if (!records || records.length === 0) {
      totalcost = 0;
    } else {
      totalcost = records.reduce((acc, record) => acc + (record.amount || 0), 0);
    }
    return totalcost;
  }, [records]);
  
  
  return (
    <div>
      <h1>Welcome {user?.username}! to Quantifi </h1>
      <FinancialRecordForm />
      <div className="total-cost">Total Monthly cost: {totalmonthly}</div>
      <FinancialRecordList />
    </div>
  );
};

export default Dashboard;
