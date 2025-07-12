// import { useEffect } from 'react';
// import { useState } from 'react';
// import { createContext } from 'react';
// import Cookies from 'js-cookie';
// import {getInfo} from '../utils/api/authService.ts'
//
// export const StoreContext = createContext();
//
// export const StoreProvider = ({ children }) => {
//     const [userInfo, setUserInfo] = useState(null);
//     const [userId, setUserId] = useState(Cookies.get('userId'));
//
//     const handleLogOut = () => {
//         Cookies.remove('token');
//         Cookies.remove('refreshToken');
//         Cookies.remove('userId');
//         setUserInfo(null);
//         window.location.reload();
//     };
//
//     useEffect(() => {
//         // call api info
//         if (userId) {
//             getInfo(userId)
//                 .then((res) => {
//                     setUserInfo(res.data.data);
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         }
//     }, [userId]);
//
//     console.log('userInfo:', userInfo);
//     console.log('handleLogOut:', handleLogOut);
//     console.log('setUserId:', setUserId);
//
//     return (
//         <StoreContext.Provider value={{ userInfo, handleLogOut, setUserId }}>
//             {children}
//         </StoreContext.Provider>
//     );
// };