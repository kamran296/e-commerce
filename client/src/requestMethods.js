import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yjc2Yjg1MjJjODYzMTU3YmJkYjBmOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNDYyMjg4OCwiZXhwIjoxNzA0ODgyMDg4fQ.S0BXSrsvjpgOyO02a-mSO1jpLGdM_cHnIUZwRUi3f8o";

export const publicRequest = axios.create({
  baseUrl: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
