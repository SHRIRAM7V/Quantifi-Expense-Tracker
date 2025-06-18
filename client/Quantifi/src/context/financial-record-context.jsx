import { useContext, useState } from "react";
import { useEffect } from "react";
import { useUser} from "@clerk/clerk-react";
import { createContext } from "react";

export const FinancialRecordContext = createContext();

export const FinancialContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();
  console.log("User in FinancialContextProvider:", user);

  const FetchFinancialRecords = async () => {
    try {
      if (!user) {
        return;
      }
      else{

      
      console.log("Fetching financial records for user:", user);
      const response = await fetch(
        `http://localhost:3001/financial-records/getallbyuserid/${user.id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Financial Records Fetched", data);
        setRecords(data);
      }
      }
    } catch (error) {
      console.error("Error fetching financial records:", error);
    }
  };

  useEffect(() => {
    FetchFinancialRecords();
  }, [user]);

  const addRecord = async (record) => {
    try {
      const response = await fetch("http://localhost:3001/financial-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        const data = await response.json();
        setRecords((prevRecords) => [...prevRecords, data]);
        console.log("Record added successfully:", data);
      }
    } catch (error) {
      throw new Error("Failed to add record: " + error.message);
    }
  };

  const updateRecord = async (id, newrecord) => {
    try {
      const response = await fetch(
        `http://localhost:3001/financial-records/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newrecord),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRecords((prevRecords) =>
          prevRecords.map((record) => (record._id === id ? data : record))
        );
        console.log("Record updated successfully:", data);
      }
    } catch (error) {
      throw new Error("Failed to update record: " + error.message);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/financial-records/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const delrec = await response.json();
        setRecords((prevRecords) =>
          prevRecords.filter((record) => record._id !== delrec._id)
        );
      }
    } catch (error) {
      throw new Error("Failed to delete record: " + error.message);
    }
  };

  return (
    <FinancialRecordContext.Provider
      value={{
        records,
        addRecord,
        updateRecord,
        deleteRecord,
        FetchFinancialRecords,
      }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecordContext = () => {
  const context = useContext(FinancialRecordContext);
  if (!context) {
    throw new Error(
      "useFinancialRecordContext must be used within a FinancialContextProvider"
    );
  }
  return context;
};
