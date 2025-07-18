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