import axios from "axios";
const api = axios.create({
  baseURL: "/api",
});
export const getPlantsDetails = async (str) => {
  return api.get(`/plants/getPlants${str}`);
};

export const addItems = async () => {
  return api.post("/items/add-items");
};
export const signUp = (data) => {
  return api.post("/auth/signUp", data);
};
export const signIn = (data) => {
  return api.post("/auth/signIn", data);
};
