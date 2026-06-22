import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

//creating an axios instance
const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, // This attaches cookies (e.g., refresh token) to the request
});

/** Interceptor for requests sent from the application:
retrieve the Access Token from localStorage and
add it to every API request made using the axios instance.
*/
axiosInstance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

/** Interceptor for responses received by the application:
check if the response indicates an expired access token, and
if so, send a refresh token request to obtain a new access token and
retry the original request using the updated token.
Here the refresh token is stored as cookies.
*/
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 403 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const response = await axios.get(`${baseURL}/refresh`, {
                    withCredentials: true, // This attaches cookies (e.g., refresh token) to the request
                });
                if (response) {
                    //update the access token
                    localStorage.setItem("token", response.data.token);

                    originalRequest.headers["Authorization"] =
                        `Bearer ${response.data.token}`;

                    return axiosInstance(originalRequest);
                }
            } catch (error) {
                // console.error('Error fetching data:', error);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
