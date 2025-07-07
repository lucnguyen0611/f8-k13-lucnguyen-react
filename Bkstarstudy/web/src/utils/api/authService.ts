import axiosClient from './axiosClient';

const register = async (body) => {
    return await axiosClient.post('/master/user', body);
};
//
// const signIn = async (body) => {
//     return await axiosClient.post('/login', body);
// };


const signIn = async (body) => {
    try {
        const res = await axiosClient.post('/login', body);

        console.log('📦 Full Axios Response:', res);
        console.log('✅ Response data:', res?.data);

        if (!res || !res.data) {
            throw new Error('Dữ liệu trả về từ server không hợp lệ.');
        }

        // Lấy token theo đúng trường được trả về
        const { access, refresh } = res.data;

        if (!access || !refresh) {
            throw new Error('Thiếu access hoặc refresh token trong response.');
        }

        // Có thể thêm userId nếu API trả về
        // const { userId } = res.data;

        return {
            token: access,
            refreshToken: refresh,
            // userId // nếu có
        };
    } catch (err) {
        console.error('❌ Login failed:', err.response?.data || err.message);
        throw err;
    }
};




const getInfo = async (userId) => {
    return await axiosClient.get(`/master/user/${userId}`);
};

export { register, signIn, getInfo };