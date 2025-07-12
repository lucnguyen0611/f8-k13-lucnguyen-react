// import axiosClient from './axiosClient';
//
// const register = async (body) => {
//     return await axiosClient.post('/master/user', body);
// };
//
// const signIn = async (body) => {
//     try {
//         const res = await axiosClient.post('/login', body);
//
//         console.log('📦 Full Axios Response:', res);
//         console.log('✅ Response data:', res?.data);
//
//         if (!res || !res.data) {
//             throw new Error('Dữ liệu trả về từ server không hợp lệ.');
//         }
//
//         // Lấy token theo đúng trường được trả về
//         const { access, refresh } = res.data;
//
//         if (!access || !refresh) {
//             throw new Error('Thiếu access hoặc refresh token trong response.');
//         }
//
//         // Có thể thêm userId nếu API trả về
//         // const { userId } = res.data;
//
//         return {
//             token: access,
//             refreshToken: refresh,
//             // userId // nếu có
//         };
//     } catch (err) {
//         console.error('❌ Login failed:', err.response?.data || err.message);
//         throw err;
//     }
// };
//
//
//
//
// const getInfo = async (userId) => {
//     return await axiosClient.get(`/master/user/${userId}`);
// };
//
// export { register, signIn, getInfo };


// src/apis/authService.ts
import axiosClient from './axiosClient';
import type { AxiosError } from 'axios';

// ======================
// Interfaces / Types
// ======================
interface RegisterBody {
    username: string;
    password: string;
    email?: string;
    // Thêm các trường khác nếu cần
}

interface LoginBody {
    email: string;
    password: string;
}

interface LoginResponse {
    access: string;
    refresh: string;
    // userId?: string;
}

interface UserInfo {
    id: string;
    username: string;
    email?: string;
    // Các trường khác từ API
}

// ======================
// API Functions
// ======================

export const register = async (body: RegisterBody): Promise<any> => {
    return await axiosClient.post('/master/user', body);
};

export const signIn = async (body: LoginBody): Promise<{
    token: string;
    refreshToken: string;
}> => {
    try {
        const res = await axiosClient.post<LoginResponse>('/login', body);

        if (!res || !res.data) {
            throw new Error('Dữ liệu trả về từ server không hợp lệ.');
        }

        const { access, refresh } = res.data;

        if (!access || !refresh) {
            throw new Error('Thiếu access hoặc refresh token trong response.');
        }

        return {
            token: access,
            refreshToken: refresh,
        };
    } catch (err) {
        const axiosErr = err as AxiosError;
        console.error('❌ Login failed:', axiosErr.response?.data || axiosErr.message);
        throw axiosErr;
    }
};
export const getInfo = async (userId: string): Promise<UserInfo> => {
    const res = await axiosClient.get<UserInfo>(`/master/user/${userId}`);
    return res.data;
};
