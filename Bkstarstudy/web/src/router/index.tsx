import {createBrowserRouter} from "react-router";
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ClassOverView from '../pages/ClassOverView'
// import Test from '../components/Test'
// import Member from '../components/Member'

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/class/:id/*",
    element: <ClassOverView/>,
  },
  // {
  //   path: "/test",
  //   element: <Test/>,
  // },
  // {
  //   path: "/members",
  //   element: <Member/>,
  // },
]);

export default router