// function App() {
//
//     return (
//         <>
//         </>
//     )
// }
//
// export default App
//
// import { RouterProvider } from "react-router";
// import router from "./router";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { injectAuthStore } from "./utils/axiosClient";
//
// // Inject auth context vào axios interceptor
// function InjectAuth() {
//     const auth = useAuth();
//     injectAuthStore(auth);
//     return null;
// }
//
// const AppContent = () => {
//     return (
//         <AuthProvider>
//             <InjectAuth />
//             {/* Children bên trong AuthProvider cần có context router */}
//             {/* Nhưng RouterProvider phải ở trên để useNavigate hoạt động */}
//         </AuthProvider>
//     );
// };
//
// const App = () => {
//     return (
//         <RouterProvider router={router}>
//             <AppContent />
//         </RouterProvider>
//     );
// };
//
// export default App;

// App.tsx
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { RouterProvider } from "react-router-dom";
// import { injectAuthStore } from "./utils/axiosClient";
// import router from "./router";
//
// function InjectAuth() {
//     const auth = useAuth();
//     injectAuthStore(auth);
//     return null;
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
//
// export default App;


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { RouterProvider } from 'react-router-dom';
// import routers from './router/index.tsx';
// import { Suspense } from 'react';
// import { StoreProvider } from './context/StoreProvider.tsx';
//
// function App() {
//     return (
//         <StoreProvider>
//
//                     <BrowserRouter>
//
//                         <Suspense fallback={<div>Loading...</div>}>
//                             {/*<Routes>*/}
//                             {/*    {routers.map((item, index) => {*/}
//                             {/*        return (*/}
//                             {/*            <Route*/}
//                             {/*                path={item.path}*/}
//                             {/*                element={<item.component />}*/}
//                             {/*                key={index}*/}
//                             {/*            />*/}
//                             {/*        );*/}
//                             {/*    })}*/}
//                             {/*</Routes>*/}
//                             <RouterProvider router={routers} />;
//                         </Suspense>
//                     </BrowserRouter>
//
//         </StoreProvider>
//     );
// }
//
// export default App;

import { RouterProvider } from 'react-router-dom';
import routers from './router/index.tsx';
import { Suspense } from 'react';
import { StoreProvider } from './context/StoreProvider.tsx';

function App() {
    return (
        <StoreProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={routers} />
            </Suspense>
        </StoreProvider>
    );
}

export default App;
