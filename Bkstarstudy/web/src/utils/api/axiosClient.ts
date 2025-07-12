// import axios from 'axios';
// import Cookies from 'js-cookie';
//
// // Tạo instance của axios
// const axiosClient = axios.create({
//     baseURL: "https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/",
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });
//
// // Gắn token trước mỗi request
// const handleRequestSuccess = (config) => {
//     const token = Cookies.get('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// };
//
// const handleRequestErr = (err) => Promise.reject(err);
//
// // Xử lý response thành công
// const handleResponseSuccess = (res) => res;
//
// // Xử lý response lỗi
// const handleResponseErr = async (err) => {
//     const originalRequest = err.config;
//
//     // Nếu lỗi 401 và chưa retry
//     if (err.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const refreshToken = Cookies.get('refreshToken');
//
//         if (!refreshToken) return Promise.reject(err);
//
//         try {
//             // ⚠️ Gửi đúng key là "refresh", không phải "token"
//             const res = await axios.post('https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/login/get_new_token/', {
//                 refresh: refreshToken,
//             });
//
//             const newAccessToken = res.data?.access;
//             if (!newAccessToken) throw new Error("Không nhận được accessToken mới");
//
//             // Lưu accessToken mới và retry request gốc
//             Cookies.set('token', newAccessToken);
//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//
//             return axiosClient(originalRequest);
//         } catch (error) {
//             // Nếu không làm mới được token, xoá cookies và trả về lỗi
//             Cookies.remove('token');
//             Cookies.remove('refreshToken');
//             return Promise.reject(error);
//         }
//     }
//
//     // Nếu không phải lỗi 401 hoặc đã retry, trả lỗi
//     return Promise.reject(err);
// };
//
// // Gắn interceptors
// axiosClient.interceptors.request.use(
//     handleRequestSuccess,
//     handleRequestErr
// );
//
// axiosClient.interceptors.response.use(
//     handleResponseSuccess,
//     handleResponseErr
// );
//
// export default axiosClient;



// src/utils/api/axiosClient.ts
// import axios, {
//     AxiosError,
//     AxiosInstance,
//     AxiosRequestConfig,
//     AxiosResponse
// } from 'axios';
//
// import Cookies from 'js-cookie';
//
// // Tạo instance
// const axiosClient: AxiosInstance = axios.create({
//     baseURL: "https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/",
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });
//
// // Gắn token trước mỗi request
// const handleRequestSuccess = (config: AxiosRequestConfig): AxiosRequestConfig => {
//     const token = Cookies.get('token');
//     if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// };
//
// const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
//     return Promise.reject(error);
// };
//
// // Xử lý response thành công
// const handleResponseSuccess = <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
//     return response;
// };
//
// // Xử lý response lỗi và làm mới token nếu cần
// const handleResponseError = async (error: AxiosError): Promise<any> => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
//
//     if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const refreshToken = Cookies.get('refreshToken');
//
//         if (!refreshToken) return Promise.reject(error);
//
//         try {
//             const res = await axios.post('https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/login/get_new_token/', {
//                 refresh: refreshToken,
//             });
//
//             const newAccessToken = (res.data as { access: string })?.access;
//
//             if (!newAccessToken) throw new Error("Không nhận được accessToken mới");
//
//             // Lưu token mới
//             Cookies.set('token', newAccessToken);
//
//             if (originalRequest.headers) {
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             }
//
//             return axiosClient(originalRequest);
//         } catch (refreshError) {
//             Cookies.remove('token');
//             Cookies.remove('refreshToken');
//             return Promise.reject(refreshError);
//         }
//     }
//
//     return Promise.reject(error);
// };
//
// // Gắn interceptors
// axiosClient.interceptors.request.use(
//     handleRequestSuccess,
//     handleRequestError
// );
//
// axiosClient.interceptors.response.use(
//     handleResponseSuccess,
//     handleResponseError
// );
//
// export default axiosClient;


// src/utils/api/axiosClient.ts
import axios from 'axios';
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';
import Cookies from 'js-cookie';

const axiosClient: AxiosInstance = axios.create({
    baseURL: 'https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// ✅ Request interceptor
const handleRequestSuccess = (
    config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
    const token = Cookies.get('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

// ✅ Response interceptor
const handleResponseSuccess = <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
    return response;
};

const handleResponseError = async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) return Promise.reject(error);

        try {
            const res = await axios.post('https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/login/get_new_token/', {
                refresh: refreshToken,
            });

            const newAccessToken = (res.data as { access: string })?.access;
            if (!newAccessToken) throw new Error("Không nhận được accessToken mới");

            Cookies.set('token', newAccessToken);

            if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }

            return axiosClient(originalRequest);
        } catch (refreshError) {
            Cookies.remove('token');
            Cookies.remove('refreshToken');
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
};

// Gắn interceptors
axiosClient.interceptors.request.use(handleRequestSuccess, handleRequestError);
axiosClient.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default axiosClient;
