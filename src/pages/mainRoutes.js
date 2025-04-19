import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./home/home";
import Navbar from "../component/navbar";
import ErrorPage from "./errorPage";
import SignIn, { SignUp } from "./SignIn/signIn";
import MyOrders from "./MyOrder/myOrders";
import Cart from "./cart/cart";
const mainRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Navbar />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'signin',
                element: <SignIn />
            },
            {
                path: 'cart/myOrders',
                element: <MyOrders />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: "signup",
                element: <SignUp />
            }
        ]
    }
]);
export default mainRoutes;
