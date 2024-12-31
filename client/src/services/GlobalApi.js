import axios from "axios";
const api = axios.create({
  baseURL: "/api",
});
export const getPlantsDetails = async (str) => {
  return api.get(`/items/getItems${str}`);
};
export const addItems = async (data) => {
  return api.post("/items/add-items", data);
};
export const signUp = async (data) => {
  return api.post("/auth/signUp", data);
};
export const signIn = async (data) => {
  return api.post("/auth/signIn", data);
};
export const fetchDetailsById = async (id) => {
  return api.get(`/items/${id}`);
};
export const order = async (data) => {
  return api.post("/orders", data);
};
export const getAllOrders = async () => {
  return api.get("/orders");
};
export const getpendingOrders = async () => {
  return api.get("/orders?status=pending");
};
export const completeOrder = async (id) => {
  return api.put(`/orders/${id}`);
};
export const updateItems = async (id, data) => {
  return api.put(`/items/editItems/${id}`, data);
};
export const deleteItems = async (id) => {
  return api.delete(`/items/deleteItems/${id}`);
};
export const signOut = async (id) => {
  return api.post(`/auth/signOut/${id}`);
};
export const provincePrices = async () => {
  return api.get("/province");
};
export const updateProvincePrices = async (data) => {
  return api.put("/province", data);
};
