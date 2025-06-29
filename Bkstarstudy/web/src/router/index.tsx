import {createBrowserRouter} from "react-router";
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ClassOverView from '../pages/ClassOverView'
// import Test from '../components/ClassroomList'
// import Member from '../components/ClassroomList'

const router = createBrowserRouter([
  {
    path: "/classes",
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
]);

export default router