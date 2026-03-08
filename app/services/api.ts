import axios from "axios";

export const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

function redirectToLogin() {
    if (typeof window !== "undefined") {
        window.location.replace("/login")
    }
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axios.post("/api/auth/refresh", {}, {
                    withCredentials: true
                });
                return api(originalRequest);
            } catch (refreshError) {
                redirectToLogin();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)