import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// GET all
export const getTransactions = () => API.get("/transactions");

// GET one
export const getTransaction = (id) => API.get(`/transactions/${id}`);

// CREATE
export const createTransaction = (data) => API.post("/transactions", data);

// UPDATE
export const updateTransaction = (id, data) =>
  API.put(`/transactions/${id}`, data);

// DELETE
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
