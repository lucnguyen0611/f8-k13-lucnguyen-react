import { RouterProvider } from 'react-router-dom';
import routers from './router/index.tsx';
import { Suspense } from 'react';
// import { StoreProvider } from './context/StoreProvider.tsx';

function App() {
    return (
        // <StoreProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={routers} />
            </Suspense>
        // </StoreProvider>
    );
}

export default App;

// import { Suspense } from 'react';
// import { RouterProvider } from 'react-router-dom';
// import routers from './router/index';
//
// function App() {
//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <RouterProvider router={routers} />
//         </Suspense>
//     );
// }
//
// export default App;
