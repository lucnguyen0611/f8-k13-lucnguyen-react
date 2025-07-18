import axiosClient from './axiosClient';
import type { AxiosError } from 'axios';
import type { RegisterPayloadI, UserInfoI, LoginBodyI } from '../index.ts'

interface LoginResponse {
    access: string;
    refresh: string;
}

export const register = async (body: RegisterPayloadI): Promise<any> => {
    return await axiosClient.post('/master/user', body);
};

export const signIn = async (body: LoginBodyI): Promise<{
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
export const getInfo = async (userId: string): Promise<UserInfoI> => {
    const res = await axiosClient.get(`/master/user/${userId}`);
    return res.data;
};
