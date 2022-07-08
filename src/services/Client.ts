import axios from "axios";

const BASE_URL = "http://192.168.201.14:3000/";

const client = axios.create({
  baseURL: BASE_URL,
});

export { client as HttpClient };
