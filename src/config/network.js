import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost/hr-manage/public/api/",
});
export default Api;
