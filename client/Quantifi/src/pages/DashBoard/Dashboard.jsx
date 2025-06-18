import React from "react";
import { useUser } from "@clerk/clerk-react";
import FinancialRecordForm from "./financial-record-form";
import FinancialRecordList from "./financial-record-list";
const Dashboard = () => {
  const { user } = useUser();
  return (
    <div>
      <h1>Welcome {user?.username}! to Quantifi </h1>
      <FinancialRecordForm />
      <FinancialRecordList />
    </div>
  );
};

export default Dashboard;
