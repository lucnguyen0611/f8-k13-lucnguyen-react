// import api from '../plugins/api.ts'
import api from '../../plugins/api.ts'


export const getMethod = async (endpoint: string) => {
    try {
        const {data} = await api.get(endpoint)
        return data
    } catch (e) {
        console.log(e)
    }

    return null
}

export const postMethod = async (endpoint: string, payload: any) => {
    try {
        const {data} = await api.post(endpoint, payload)
        return data
    } catch (e) {
        console.log(e)
    }

    return null
}

export const putMethod = async (endpoint: string, payload: any) => {
    try {
        const {data} = await api.put(endpoint, payload)
        return data
    } catch (e) {
        console.log(e)
    }

    return null
}


export const deleteMethod = async (endpoint: string) => {
    try {
        const {data} = await api.get(endpoint)
        return data
    } catch (e) {
        console.log(e)
    }

    return null
}



// src/utils/api.ts
// import axiosClient from './axiosClient.ts'
//
// export const getMethod = async (endpoint: string) => {
//     try {
//         const { data } = await axiosClient.get(endpoint)
//         return data
//     } catch (error) {
//         console.error('GET error:', error)
//         return null
//     }
// }
//
// export const postMethod = async (endpoint: string, payload: any) => {
//     // console.log("accessToken at getMethod:", store?.accessToken);
//     try {
//         const { data } = await axiosClient.post(endpoint, payload)
//         return data
//     } catch (error) {
//         console.error('POST error:', error)
//         return null
//     }
// }
//
// export const putMethod = async (endpoint: string, payload: any) => {
//     try {
//         const { data } = await axiosClient.put(endpoint, payload)
//         return data
//     } catch (error) {
//         console.error('PUT error:', error)
//         return null
//     }
// }
//
// export const deleteMethod = async (endpoint: string) => {
//     try {
//         const { data } = await axiosClient.delete(endpoint)
//         return data
//     } catch (error) {
//         console.error('DELETE error:', error)
//         return null
//     }
// }



//
// import axiosClient from './axiosClient.ts';
//
// const register = async (body) => {
//     return await axiosClient.post('/register', body);
// };
//
// const signIn = async (body) => {
//     return await axiosClient.post('/login', body);
// };
//
// const getInfo = async (userId) => {
//     return await axiosClient.get(`/user/info/${userId}`);
// };
//
// export { register, signIn, getInfo };