import axios from "axios";

const getToken = () => {
  try {
    const persistedData = JSON.parse(localStorage.getItem("persist:root"));
    const user = JSON.parse(persistedData?.user);
    const accessToken = user?.currentUser?.accessToken;
    return accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = getToken();

//console.log(JSON.parse(localStorage.getItem("persist:root")));
//console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});