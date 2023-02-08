import axios from "axios";
const instance = axios.create({
    baseURL: "https://amazon-clone-api-79w3.onrender.com/api"//Api url
});
export default instance;