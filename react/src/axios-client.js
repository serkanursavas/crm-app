import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
});

axiosClient.interceptors.response
    .use((response) => {
        return response;
    })
    .catch((error) => {
        const { response } = error;

        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
        }

        throw error;
    });

export default axiosClient;
