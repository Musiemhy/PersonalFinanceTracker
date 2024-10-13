import React, { useState, useEffect } from "react";
import "./Table.scss";
import Modal from "../Form/Modal";
import Form from "../Form/Form";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

const columns = (handleEdit, handleDelete) => [
  { field: "idNum", headerName: "ID", width: 70 },
  { field: "type", headerName: "Type", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 130,
  },
  {
    field: "transactionDate",
    headerName: "Date",
    width: 150,
  },
  {
    field: "reason",
    headerName: "Reason",
    description: "This column is not sortable.",
    sortable: false,
    width: 250,
  },
  {
    field: "action",
    headerName: "Action",
    description: "This column is not sortable.",
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <div className="action">
        <button className="edit" onClick={() => handleEdit(params.row)}>
          EDIT
        </button>
        <button className="delete" onClick={() => handleDelete(params.row)}>
          DELETE
        </button>
      </div>
    ),
  },
];

const Table = ({ refresh }) => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5555/api/gettransaction",
          { userId }
        );

        if (
          response.data === "No Transactions Yet" ||
          response.data.length === 0
        ) {
          setError("No Transactions Yet");
        } else if (response.data === "Did not receive userId!") {
          setError("Something went Wrong. Please refresh!");
        } else {
          setRows(
            response.data.map((transaction, index) => {
              const amount =
                transaction.amount === "N/A" ? 0 : Number(transaction.amount);
              const formattedDate = transaction.date
                ? format(new Date(transaction.date), "MM/dd/yyyy")
                : "Invalid date";

              return {
                id: transaction._id,
                idNum: index + 1,
                type: transaction.type,
                category: transaction.category,
                amount: amount,
                transactionDate: formattedDate,
                reason: transaction.reason,
              };
            })
          );
        }
      } catch (error) {
        console.log("The error is: ", error);
      }
    };

    fetchTransactions();
  }, [refresh, refreshData]);

  const openModal = (type, transaction) => {
    setModalType(type);
    setCurrentTransaction(transaction);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentTransaction(null);
  };

  const handleEdit = (transaction) => {
    openModal("edit", transaction);
  };

  const handleDelete = (transaction) => {
    openModal("delete", transaction);
  };

  const handleSave = async (updatedTransaction) => {
    try {
      await axios.put("http://localhost:5555/api/updatetransaction", {
        ...updatedTransaction,
      });

      setRows((prevRows) =>
        prevRows.map((transaction) =>
          transaction.id === updatedTransaction.id
            ? {
                ...updatedTransaction,
                transactionDate: updatedTransaction.date
                  ? format(new Date(updatedTransaction.date), "MM/dd/yyyy")
                  : "Invalid Date",
                idNum: transaction.idNum,
              }
            : transaction
        )
      );

      closeModal();
    } catch (error) {
      console.error("Failed to save transaction:", error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await axios.delete("http://localhost:5555/api/deletetransaction", {
        params: { transactionId },
      });

      setRows((prevRows) =>
        prevRows.filter((transaction) => transaction.id !== transactionId)
      );

      setKey((prevKey) => prevKey + 1);

      closeModal();
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  return (
    <div className="table">
      {error ? (
        <p className="errors">{error}</p>
      ) : (
        <DataGrid
          key={key}
          rows={rows}
          columns={columns(handleEdit, handleDelete)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
      <Modal open={isOpen} onClose={closeModal}>
        {modalType === "edit" && (
          <Form initialData={currentTransaction} onSave={handleSave} />
        )}
        {modalType === "delete" && (
          <div className="delete">
            <p className="deleteQuestion">
              Are you sure you want to delete this transaction?
            </p>
            <div className="btns">
              <button
                className="deleteBtn"
                onClick={() => handleDeleteTransaction(currentTransaction.id)}
              >
                Yes
              </button>
              <button className="deleteBtn" onClick={closeModal}>
                No
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Table;
