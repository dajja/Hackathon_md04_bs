import axios from "axios";

const baseURL = "http://localhost:8000";

const axioss = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axioss;