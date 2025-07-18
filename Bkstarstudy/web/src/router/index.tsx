import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ClassOverView from '../pages/ClassOverView';
import ClassAdd from '../pages/ClassAdd';

const routers = createBrowserRouter([
  {
    path: "/classes",
    element: <Home />,
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
    element: <ClassOverView />,
  },
  {
    path: "/class/add",
    element: <ClassAdd />,
  },
]);

export default routers;

