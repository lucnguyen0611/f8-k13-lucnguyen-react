// import {createBrowserRouter} from "react-router";
// import Home from '../pages/Home'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// import ClassOverView from '../pages/ClassOverView'
// import ClassAdd from '../pages/ClassAdd'
// // import Test from '../components/ClassroomList'
// // import Member from '../components/ClassroomList'
//
// const routers = createBrowserRouter([
//   {
//     path: "/classes",
//     element: <Home/>,
//   },
//   {
//     path: "/login",
//     element: <Login/>,
//   },
//   {
//     path: "/register",
//     element: <Register/>,
//   },
//   {
//     path: "/class/:id/*",
//     element: <ClassOverView/>,
//   },
//   {
//     path: "/class/:add",
//     element: <ClassAdd/>,
//   },
// ]);
//
// export default routers

// import { createBrowserRouter, Outlet } from "react-router-dom";
// import { useEffect } from "react";
//
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ClassOverView from "../pages/ClassOverView";
// import ClassAdd from "../pages/ClassAdd";
//
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { injectAuthStore } from "../utils/axiosClient";
//
// // Component dùng để inject auth
// function InjectAuth() {
//   const auth = useAuth();
//
//   useEffect(() => {
//     if (auth?.accessToken) {
//       injectAuthStore(auth);
//     }
//   }, [auth?.accessToken]);
//
//   return null;
// }
//
// // Layout bọc toàn bộ route
// // function RootLayout() {
// //   return (
// //       <AuthProvider>
// //         <InjectAuth />
// //         <Outlet />
// //       </AuthProvider>
// //   );
// // }
// //
// // const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <RootLayout />, // ✅ Bọc auth toàn cục ở đây
// //     children: [
// //       {
// //         path: "classes",
// //         element: <Home />,
// //       },
// //       {
// //         path: "login",
// //         element: <Login />,
// //       },
// //       {
// //         path: "register",
// //         element: <Register />,
// //       },
// //       {
// //         path: "class/:id/*",
// //         element: <ClassOverView />,
// //       },
// //       {
// //         path: "class/:add",
// //         element: <ClassAdd />,
// //       },
// //     ],
// //   },
// // ]);
//
// function RootLayout() {
//   return (
//       <AuthProvider>
//         <InjectAuth />
//         <Outlet />
//       </AuthProvider>
//   );
// }
//
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { path: "classes", element: <Home /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//       { path: "class/:id/*", element: <ClassOverView /> },
//       { path: "class/:add", element: <ClassAdd /> },
//     ],
//   },
// ]);
//
// // export default router;
//
// import { createBrowserRouter, Outlet } from "react-router-dom";
// import { useEffect } from "react";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ClassOverView from "../pages/ClassOverView";
// import ClassAdd from "../pages/ClassAdd";
// import { useAuth } from "../context/AuthContext";
// import { injectAuthStore } from "../utils/axiosClient";
//
// // Chỉ dùng để inject token khi AuthProvider đã tồn tại
// function InjectAuth() {
//   const auth = useAuth();
//
//   useEffect(() => {
//     if (auth) injectAuthStore(auth);
//   }, [auth]);
//
//   return null;
// }
//
// function RootLayout() {
//   return (
//       <>
//         <InjectAuth />
//         <Outlet />
//       </>
//   );
// }
//
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { path: "classes", element: <Home /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//       { path: "class/:id/*", element: <ClassOverView /> },
//       { path: "class/add", element: <ClassAdd /> },
//     ],
//   },
// ]);
//
// export default router;

// import { createBrowserRouter, Outlet } from "react-router-dom";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ClassOverView from "../pages/ClassOverView";
// import ClassAdd from "../pages/ClassAdd";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { useEffect } from "react";
// import { injectAuthStore } from "../utils/axiosClient";
//
// function InjectAuth() {
//   const auth = useAuth();
//
//   useEffect(() => {
//     if (auth) injectAuthStore(auth);
//   }, [auth]);
//
//   return null;
// }
//
// function RootLayout() {
//   return (
//       <AuthProvider>
//         <InjectAuth />
//         <Outlet />
//       </AuthProvider>
//   );
// }
//
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { path: "classes", element: <Home /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//       { path: "class/:id/*", element: <ClassOverView /> },
//       { path: "class/add", element: <ClassAdd /> }, // sửa lại đúng: không dùng `:add`
//     ],
//   },
// ]);
//
// export default router;



// import { createBrowserRouter } from "react-router-dom";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ClassOverView from "../pages/ClassOverView";
// import ClassAdd from "../pages/ClassAdd";
//
// import { ProtectedRoute } from "./ProtectedRoute.tsx";
//
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//         <ProtectedRoute>
//           <Home />
//         </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/classes",
//     element: (
//         <ProtectedRoute>
//           <Home />
//         </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/class/:id/*",
//     element: (
//         <ProtectedRoute>
//           <ClassOverView />
//         </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/class/add", // sửa lại từ :add → add
//     element: (
//         <ProtectedRoute>
//           <ClassAdd />
//         </ProtectedRoute>
//     ),
//   },
// ]);
//
// export default router;


import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ClassOverView from '../pages/ClassOverView';
import ClassAdd from '../pages/ClassAdd';
// import { ProtectedRoute } from '../components/ProtectedRoute';
// import {ProtectedRoute} from './ProtectedRoute';

const routers = createBrowserRouter([
  {
    path: "/classes",
    element: (
        // <ProtectedRoute>
          <Home />
        // </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/class/:id/*",
    element: (
        // <ProtectedRoute>
          <ClassOverView />
        // </ProtectedRoute>
    ),
  },
  {
    path: "/class/add", // chỉnh path sai từ `:add` → `add`
    element: (
        // <ProtectedRoute>
          <ClassAdd />
        // </ProtectedRoute>
    ),
  },
]);

export default routers;

