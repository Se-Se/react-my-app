import axios from "axios";

const api = axios.create({
  Headers: {
    "Access-Control-Allow-Origin": "*",
  },
  baseUrl: {
    dev: "http://dev",
    alpha: "http://alpha",
    prod: "http://prod",
  }[process.env.REACT_APP_MODE],
});

export default api;
