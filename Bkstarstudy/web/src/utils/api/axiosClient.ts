// // src/utils/axiosClient.ts
// import axios from 'axios';
//
// const axiosClient = axios.create({
//     baseURL: 'https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });
//
// // Request interceptor: gắn token
// axiosClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('access');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });
//
// // Response interceptor: nếu 401 thì thử refresh token
// axiosClient.interceptors.response.use(
//     (res) => res,
//     async (err) => {
//         const originalConfig = err.config;
//
//         if (err.response?.status === 401 && !originalConfig._retry) {
//             originalConfig._retry = true;
//
//             const refreshToken = localStorage.getItem('refresh');
//             if (!refreshToken) return Promise.reject(err);
//
//             try {
//                 const response = await axios.post(
//                     'https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/login/get_new_token/',
//                     { token: refreshToken },
//                 );
//
//                 const newAccess = response.data.access;
//                 localStorage.setItem('access', newAccess);
//
//                 // Gắn lại token mới
//                 originalConfig.headers.Authorization = `Bearer ${newAccess}`;
//                 return axiosClient(originalConfig);
//             } catch (refreshError) {
//                 localStorage.removeItem('access');
//                 localStorage.removeItem('refresh');
//                 return Promise.reject(refreshError);
//             }
//         }
//
//         return Promise.reject(err);
//     }
// );
//
// export default axiosClient;


// import axios from "axios";
//
// const axiosClient = axios.create({
//     baseURL: "https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/",
//     headers: {
//         "Content-Type": "application/json",
//     },
// });
//
// let store;
// export const injectAuthStore = (authStore) => {
//     store = authStore;
// };
//
// axiosClient.interceptors.request.use((config) => {
//     const token = store?.accessToken;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });
//
// axiosClient.interceptors.response.use(
//     (res) => res,
//     async (err) => {
//         const originalConfig = err.config;
//
//         if (err.response?.status === 401 && !originalConfig._retry) {
//             originalConfig._retry = true;
//
//             try {
//                 const newToken = await store.refreshAccessToken();
//                 originalConfig.headers.Authorization = `Bearer ${newToken}`;
//                 return axiosClient(originalConfig);
//             } catch (refreshError) {
//                 return Promise.reject(refreshError);
//             }
//         }
//
//         return Promise.reject(err);
//     }
// );
//
// export default axiosClient;


// import axios from "axios";
//
// const axiosClient = axios.create({
//     baseURL: "https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/",
//     headers: {
//         "Content-Type": "application/json",
//     },
// });
//
// let store
//
// export const injectAuthStore = (authStore: AuthContextType) => {
//     store = authStore;
// };
//
// axiosClient.interceptors.request.use((config) => {
//     const token = store?.accessToken;
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
//
// axiosClient.interceptors.response.use(
//     (res) => res,
//     async (err) => {
//         const originalConfig = err.config;
//         if (err.response?.status === 401 && !originalConfig._retry && store?.refreshAccessToken) {
//             originalConfig._retry = true;
//             try {
//                 const newToken = await store.refreshAccessToken();
//                 originalConfig.headers.Authorization = `Bearer ${newToken}`;
//                 return axiosClient(originalConfig);
//             } catch (refreshError) {
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(err);
//     }
// );
//
// export default axiosClient;



// utils/axiosClient.ts
// import axios from "axios";
//
// let authStore: any = null;
//
// /**
//  * Inject auth context (chỉ cần gọi 1 lần trong App)
//  */
// export const injectAuthStore = (store: any) => {
//     authStore = store;
// };
//
// /**
//  * Lấy store hiện tại để dùng trong interceptor
//  */
// const getAuthStore = () => authStore;
//
// const axiosClient = axios.create({
//     baseURL: "https://your-api-url.com/api", // ⚠️ Đổi lại URL API của bạn
//     headers: {
//         "Content-Type": "application/json",
//     },
// });
//
// // ✅ Gắn token vào mỗi request
// axiosClient.interceptors.request.use(
//     (config) => {
//         const token = getAuthStore()?.accessToken;
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
//
// // ✅ Xử lý lỗi 401: tự refresh token
// axiosClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalConfig = error.config;
//
//         if (
//             error.response?.status === 401 &&
//             !originalConfig._retry &&
//             typeof getAuthStore()?.refreshAccessToken === "function"
//         ) {
//             originalConfig._retry = true;
//             try {
//                 const newToken = await getAuthStore().refreshAccessToken();
//                 originalConfig.headers.Authorization = `Bearer ${newToken}`;
//                 return axiosClient(originalConfig);
//             } catch (refreshError) {
//                 return Promise.reject(refreshError);
//             }
//         }
//
//         return Promise.reject(error);
//     }
// );
//
// export default axiosClient;


//
// import axios from 'axios';
// import Cookies from 'js-cookie';
//
// const axiosClient = axios.create({
//     baseURL: "https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/",
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });
//
// const handleRequestSuccess = async (config) => {
//     const token = Cookies.get('token');
//
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//
//     return config;
// };
//
// const handleRequestErr = (err) => {
//     return Promise.reject(err);
// };
//
// const handleResponseSuccess = (res) => {
//     return res;
// };
//
// const handleResponseErr = async (err) => {
//     const originalRequest = err.config;
//
//     if (err.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const refreshToken = Cookies.get('refreshToken');
//
//         if (!refreshToken) return Promise.reject(err);
//
//         try {
//             const res = await axiosClient.post('/login/get_new_token/', {
//                 token: refreshToken
//             });
//
//             const newAccessToken = res.data.accessToken;
//             Cookies.set('token', newAccessToken);
//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//
//             return axiosClient(originalRequest);
//         } catch (error) {
//             Cookies.remove('token');
//             Cookies.remove('refreshToken');
//             return Promise.reject(error);
//         }
//     }
// };
//
// axiosClient.interceptors.request.use(
//     (config) => handleRequestSuccess(config),
//     (err) => handleRequestErr(err)
// );
//
// axiosClient.interceptors.response.use(
//     (config) => handleResponseSuccess(config),
//     (err) => handleResponseErr(err)
// );
//
// export default axiosClient;


import axios from 'axios';
import Cookies from 'js-cookie';

// Tạo instance của axios
const axiosClient = axios.create({
    baseURL: "https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Gắn token trước mỗi request
const handleRequestSuccess = (config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

const handleRequestErr = (err) => Promise.reject(err);

// Xử lý response thành công
const handleResponseSuccess = (res) => res;

// Xử lý response lỗi
const handleResponseErr = async (err) => {
    const originalRequest = err.config;

    // Nếu lỗi 401 và chưa retry
    if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = Cookies.get('refreshToken');

        if (!refreshToken) return Promise.reject(err);

        try {
            // ⚠️ Gửi đúng key là "refresh", không phải "token"
            const res = await axios.post('https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/login/get_new_token/', {
                refresh: refreshToken,
            });

            const newAccessToken = res.data?.accessToken;
            if (!newAccessToken) throw new Error("Không nhận được accessToken mới");

            // Lưu accessToken mới và retry request gốc
            Cookies.set('token', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axiosClient(originalRequest);
        } catch (error) {
            // Nếu không làm mới được token, xoá cookies và trả về lỗi
            Cookies.remove('token');
            Cookies.remove('refreshToken');
            return Promise.reject(error);
        }
    }

    // Nếu không phải lỗi 401 hoặc đã retry, trả lỗi
    return Promise.reject(err);
};

// Gắn interceptors
axiosClient.interceptors.request.use(
    handleRequestSuccess,
    handleRequestErr
);

axiosClient.interceptors.response.use(
    handleResponseSuccess,
    handleResponseErr
);

export default axiosClient;
