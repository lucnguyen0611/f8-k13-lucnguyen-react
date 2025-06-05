import {createBrowserRouter} from "react-router";
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ClassOverView from '../pages/ClassOverView'

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/classes",
    element: <ClassOverView/>,
  },
]);

export default router