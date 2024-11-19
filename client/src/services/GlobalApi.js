import axios from "axios";
const api = axios.create({
  baseURL: "/api",
});
export const getPlantsDetails = async () => {
  return api.get("/plants/getPlants?limit=5&order=desc");
};
