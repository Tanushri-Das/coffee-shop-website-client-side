import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Menu from "../../Pages/Menu/Menu";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import Dashboard from "../../Layout/Dashboard";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddItem from "../../Pages/Dashboard/AddItem/AddItem";
import ManageItems from "../../Pages/Dashboard/ManageItems/ManageItems";
import MyCart from "../../Pages/Dashboard/MyCart/MyCart";
import AddReview from "../../Pages/Dashboard/AddReview/AddReview";

const routes=createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/menu',
                element:<Menu/>
            },
            
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            }
        ]
    },
    {
        path:'dashboard',
        element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children:[
            {
                path:'/dashboard/mycart',
                element:<MyCart/>
            },
            {
                path:'/dashboard/addreview',
                element:<AddReview/>
            },
            {
                path:'/dashboard/allusers',
                element:<AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path:'/dashboard/addItem',
                element:<AdminRoute><AddItem/></AdminRoute>
            },
            {
                path:'/dashboard/manageItems',
                element:<AdminRoute><ManageItems/></AdminRoute>
            },
            
        ]
    }
])
export default routes;