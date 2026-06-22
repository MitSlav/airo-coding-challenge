import axios from "axios";
import iziToast from "izitoast";

//creating an axios instance
const axiosInstance = axios.create({
    baseURL: '/api',
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

        // Let forms handle validation errors
        if (error.response?.status === 422) {
            return Promise.reject(error);
        }

        // Refresh token flow
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== "/refresh"
        ) {
            originalRequest._retry = true;

            try {
                const response = await axiosInstance.post("/refresh");

                if (response) {
                    //update the access token
                    localStorage.setItem("token", response.data.token);

                    originalRequest.headers["Authorization"] =
                        `Bearer ${response.data.token}`;

                    return axiosInstance(originalRequest);
                }
            } catch (error) {
                localStorage.removeItem("token");

                window.location.href = "/login";

                return Promise.reject(error);
            }
        }

        // Global error handling
        const status = error.response?.status;

        switch (status) {
            case 403:
                iziToast.error({
                    title: "Forbidden",
                    message:
                        "You do not have permission to perform this action.",
                });
                break;

            case 404:
                iziToast.error({
                    title: "Not Found",
                    message: "The requested resource could not be found.",
                });
                break;

            case 500:
                iziToast.error({
                    title: "Server Error",
                    message: "An unexpected server error occurred.",
                });
                break;

            default:
                if (!error.response) {
                    iziToast.error({
                        title: "Network Error",
                        message: "Unable to connect to the server.",
                    });
                } else {
                    iziToast.error({
                        title: "Error",
                        message:
                            error.response?.data?.message ??
                            "Something went wrong.",
                    });
                }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
