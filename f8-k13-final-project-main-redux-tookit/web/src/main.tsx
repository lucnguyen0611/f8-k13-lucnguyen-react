// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./router"
import store, {getProducts, getCustomers} from './store'
import {Provider} from "react-redux";

import {RouterProvider} from "react-router";


const root = document.getElementById("root");

store.dispatch(getProducts())
store.dispatch(getCustomers())

createRoot(root!).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
)
