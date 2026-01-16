import axios from "axios";

const customFetch = axios.create({
  baseURL: `https://job-tracker-api-6nb5.onrender.com/api/v1`,
});

export default customFetch;
