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
export const signUp = (data) => {
  return api.post("/auth/signUp", data);
};
export const signIn = (data) => {
  return api.post("/auth/signIn", data);
};
export const order = (data) => {
  return api.post("/orders", data);
};
export const getAllOrders = () => {
  return api.get("/orders");
};
export const completeOrder = (id) => {
  return api.delete(`/orders/${id}`);
};
