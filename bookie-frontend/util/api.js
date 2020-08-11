import axios from "axios";

export const BASE_URL = `http://localhost:5000`;
// export const BASE_URL = `https://backend-books.herokuapp.com/`;

export const api = axios.create({
  baseURL: BASE_URL,
});
