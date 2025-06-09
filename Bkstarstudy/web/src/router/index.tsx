import {createBrowserRouter} from "react-router";
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ClassOverView from '../pages/ClassOverView'
import Test from '../pages/Test'
import Member from '../pages/Member'

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
  {
    path: "/test",
    element: <Test/>,
  },
  {
    path: "/Member",
    element: <Member/>,
  },
]);

export default router