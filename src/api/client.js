import axios from "axios";

const api = axios.create({
    baseURL:"https://www.laziakeey.in/api",
    headers:{

        "Content-Type": "application/json"

    }
});

export default api