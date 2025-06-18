// FinancialRecordList.js
import { useState } from "react";
import { useFinancialRecordContext } from "../../context/financial-record-context";

const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecordContext();
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(records[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (index) => {
    const id = records[index]?._id?.toString();
    updateRecord(id ?? "", editData);
    setEditIndex(null);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record._id?.toString() ?? index}>
              <td>
                {editIndex === index ? (
                  <input
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                  />
                ) : (
                  record.description
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    name="amount"
                    value={editData.amount}
                    onChange={handleChange}
                  />
                ) : (
                  record.amount
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    name="category"
                    value={editData.category}
                    onChange={handleChange}
                  />
                ) : (
                  record.category
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    name="paymentMethod"
                    value={editData.paymentMethod}
                    onChange={handleChange}
                  />
                ) : (
                  record.paymentMethod
                )}
              </td>
              <td>{record.date}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={() => handleSave(index)}>Save</button>
                    <button onClick={() => setEditIndex(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button
                      onClick={() => deleteRecord(record._id?.toString() ?? "")}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialRecordList;
