// import { createContext, useContext, useEffect, useState } from "react";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";
//
// const AuthContext = createContext();
//
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
//     const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
//     const navigate = useNavigate();
//
//     // Load user từ localStorage nếu có
//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (accessToken && storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);
//
//     const login = ({ accessToken, refreshToken, user }) => {
//         setAccessToken(accessToken);
//         setRefreshToken(refreshToken);
//         setUser(user);
//
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//         localStorage.setItem("user", JSON.stringify(user));
//     };
//
//     const logout = () => {
//         setAccessToken(null);
//         setRefreshToken(null);
//         setUser(null);
//
//         localStorage.clear();
//         navigate("/login");
//     };
//
//     const refreshAccessToken = async () => {
//         try {
//             const res = await axios.post("/auth/refresh", { refreshToken });
//             const newToken = res.data.accessToken;
//
//             setAccessToken(newToken);
//             localStorage.setItem("accessToken", newToken);
//
//             return newToken;
//         } catch (err) {
//             logout();
//             throw err;
//         }
//     };
//
//     return (
//         <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, refreshAccessToken }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../utils/axiosClient.ts";
// // import axios from 'axios'
//
// const AuthContext = createContext(null);
//
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(() => {
//         const storedUser = localStorage.getItem("user");
//         return storedUser ? JSON.parse(storedUser) : null;
//     });
//
//     const [accessToken, setAccessToken] = useState(() => localStorage.getItem("access"));
//     const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refresh"));
//
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         // Sync lại state khi app load lại
//         const storedAccess = localStorage.getItem("access");
//         const storedRefresh = localStorage.getItem("refresh");
//         const storedUser = localStorage.getItem("user");
//         console.log(storedUser)
//
//         if (storedAccess && storedUser) {
//             setAccessToken(storedAccess);
//             setRefreshToken(storedRefresh);
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);
//
//     const login = ({ access, refresh, user }) => {
//         setAccessToken(access);
//         setRefreshToken(refresh);
//         setUser(user);
//
//         localStorage.setItem("access", access);
//         localStorage.setItem("refresh", refresh);
//         localStorage.setItem("user", JSON.stringify(user));
//     };
//
//     const logout = () => {
//         setAccessToken(null);
//         setRefreshToken(null);
//         setUser(null);
//
//         localStorage.removeItem("access");
//         localStorage.removeItem("refresh");
//         localStorage.removeItem("user");
//
//         navigate("/login");
//     };
//
//     const refreshAccessToken = async () => {
//         try {
//             const res = await axios.post("/login/get_new_token/", {
//                 token: refreshToken,
//             });
//
//             const newAccess = res.data.access;
//             setAccessToken(newAccess);
//             localStorage.setItem("access", newAccess);
//
//             return newAccess;
//         } catch (err) {
//             logout();
//             throw err;
//         }
//     };
//
//     return (
//         <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, refreshAccessToken }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../utils/axiosClient";
//
// interface AuthUser {
//     id: string;
//     email: string;
//     // thêm các field khác nếu có
// }
//
// interface AuthContextType {
//     user: AuthUser | null;
//     accessToken: string | null;
//     refreshToken: string | null;
//     login: (payload: { access: string; refresh: string; user: AuthUser }) => void;
//     logout: () => void;
//     refreshAccessToken: () => Promise<string>;
// }
//
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
//
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<AuthUser | null>(null);
//     const [accessToken, setAccessToken] = useState<string | null>(null);
//     const [refreshToken, setRefreshToken] = useState<string | null>(null);
//
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const storedAccess = localStorage.getItem("access");
//         const storedRefresh = localStorage.getItem("refresh");
//         const storedUser = localStorage.getItem("user");
//
//         if (storedAccess && storedUser) {
//             setAccessToken(storedAccess);
//             setRefreshToken(storedRefresh);
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);
//
//     const login = ({ access, refresh, user }: { access: string; refresh: string; user: AuthUser }) => {
//         setAccessToken(access);
//         setRefreshToken(refresh);
//         setUser(user);
//         localStorage.setItem("access", access);
//         localStorage.setItem("refresh", refresh);
//         localStorage.setItem("user", JSON.stringify(user));
//     };
//
//     const logout = () => {
//         setAccessToken(null);
//         setRefreshToken(null);
//         setUser(null);
//         localStorage.clear();
//         navigate("/login");
//     };
//
//     const refreshAccessToken = async () => {
//         try {
//             const res = await axios.post("/login/get_new_token/", {
//                 token: refreshToken,
//             });
//             const newAccess = res.data.access;
//             setAccessToken(newAccess);
//             localStorage.setItem("access", newAccess);
//             return newAccess;
//         } catch (err) {
//             logout();
//             throw err;
//         }
//     };
//
//     const value: AuthContextType = {
//         user,
//         accessToken,
//         refreshToken,
//         login,
//         logout,
//         refreshAccessToken,
//     };
//
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
//
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) throw new Error("useAuth must be used within AuthProvider");
//     return context;
// };



// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosClient from "../utils/api/axiosClient.ts";
//
// const AuthContext = createContext(null);
//
// export const AuthProvider = ({ children }) => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(() => {
//         const stored = localStorage.getItem("user");
//         return stored ? JSON.parse(stored) : null;
//     });
//     const [accessToken, setAccessToken] = useState(() => localStorage.getItem("access"));
//     const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refresh"));
//
//     useEffect(() => {
//         if (!accessToken && refreshToken) {
//             refreshAccessToken().catch(() => logout());
//         }
//     }, []);
//
//     const login = ({ user, access, refresh }) => {
//         setUser(user);
//         setAccessToken(access);
//         setRefreshToken(refresh);
//
//         localStorage.setItem("user", JSON.stringify(user));
//         localStorage.setItem("access", access);
//         localStorage.setItem("refresh", refresh);
//     };
//
//     const logout = () => {
//         setUser(null);
//         setAccessToken(null);
//         setRefreshToken(null);
//         localStorage.clear();
//         navigate("/login");
//     };
//
//     const refreshAccessToken = async () => {
//         try {
//             const res = await axiosClient.post("/login/get_new_token/", {
//                 token: refreshToken,
//             });
//             const newAccess = res.data.access;
//             setAccessToken(newAccess);
//             localStorage.setItem("access", newAccess);
//             return newAccess;
//         } catch (err) {
//             logout();
//             throw err;
//         }
//     };
//
//     return (
//         <AuthContext.Provider
//             value={{ user, accessToken, refreshToken, login, logout, refreshAccessToken }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => useContext(AuthContext);
