import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Media from "../../Pages/Media/Media";
import Message from "../../Pages/Message/Message";
import ErrorPage from "../../Pages/Shared/ErrorPage";
import Login from "../../Pages/Shared/Login";
import Signup from "../../Pages/Shared/Signup";
import PrivetRoute from "../PrivetRoute/PrivetRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/media',
                loader: () => fetch(`https://we-share-server-liard.vercel.app/medias`),
                element: <PrivetRoute><Media></Media></PrivetRoute>
            },
            {
                path: '/message',
                element: <PrivetRoute><Message></Message></PrivetRoute>
            },
            {
                path: '/about',
                element: <PrivetRoute><About></About></PrivetRoute>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])