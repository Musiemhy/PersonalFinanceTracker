import React, { useState, useCallback } from "react";
import axios from "axios";
import "./TransactionPage.scss";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import Form from "../../components/Form/Form";
import Modal from "../../components/Form/Modal";
import { toast } from "react-toastify";

const TransactionPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAdd = async (transaction) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/api/addtransaction",
        transaction
      );

      if (response.data) {
        toast.success("Transaction added successfully.");
        closeModal();
        setRefresh((prev) => !prev);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to save transaction:", error);
    }
  };

  return (
    <div className="transactionPage">
      <Header />
      <div className="history">
        <span className="title">Transaction History</span>
        <Table refresh={refresh} />
        <div className="addTransaction">
          <button className="add" onClick={openModal}>
            Add new transaction
          </button>
          <Modal open={isOpen} onClose={closeModal}>
            <Form onSave={handleAdd} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
