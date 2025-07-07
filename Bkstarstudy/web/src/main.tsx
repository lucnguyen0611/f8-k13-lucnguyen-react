// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import router from "./router"
//
// import {RouterProvider,} from "react-router";
//
//
// const root = document.getElementById("root");
//
// createRoot(root!).render(
//   <>
//       <RouterProvider router={router} />
//   </>
// )

// main.tsx hoặc index.tsx
// import { createRoot } from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// import router from "./router";
// import "./index.css";
//
// const root = document.getElementById("root");
//
// createRoot(root!).render(
//     <RouterProvider router={router} />
// );

// import { RouterProvider } from "react-router";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { injectAuthStore } from "./utils/axiosClient";
// import router from "./router";
//
// // Component tạm để inject auth store vào axios interceptor
// function InjectAuth() {
//     const auth = useAuth();
//     injectAuthStore(auth);
//     return null; // Không render UI
// }
//
// const App = () => {
//     return (
//         <AuthProvider>
//             <InjectAuth />
//             <RouterProvider router={router} />
//         </AuthProvider>
//     );
// };

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}


export default App;



// import ReactDOM from 'react-dom/client'
// import App from './App'
// import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'
//
// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <AuthProvider>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </AuthProvider>
// )

// main.tsx
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import router from './router' // <- chính là file ở trên
// import { RouterProvider } from 'react-router-dom'
//
// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>
// )



// src/main.tsx hoặc src/index.tsx

// import { createRoot } from "react-dom/client";
// import { RouterProvider } from "react-router";
// import router from "./router";
//
// import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
// import { injectAuthStore } from "./utils/axiosClient.ts";
// import "./index.css";
//
// // Component tạm để inject auth vào axios instance
// function InjectAuth() {
//     const auth = useAuth();
//     injectAuthStore(auth);
//     return null; // Không render gì
// }
//
// const root = document.getElementById("root");
//
// createRoot(root!).render(
//     <AuthProvider>
//         <InjectAuth />
//         <RouterProvider router={router} />
//     </AuthProvider>
// );

// import { createRoot } from "react-dom/client";
// import { RouterProvider } from "react-router";
// import router from "./router";
//
// import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
// import { injectAuthStore } from "./utils/axiosClient.ts";
// import "./index.css";
//
// // Component tạm để inject auth vào axios instance
// function InjectAuth() {
//     const auth = useAuth();
//     injectAuthStore(auth);
//     return null; // Không render gì
// }
//
// const root = document.getElementById("root");
// createRoot(root!).render(
//     <RouterProvider router={router}>
//         <AuthProvider>
//             <InjectAuth />
//         </AuthProvider>
//     </RouterProvider>
// );
