import React from "react";
import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from "./context/authContext";



function ProtectedRoute(){
    const {user, isAuthenticated} = useAuth();

    if(!isAuthenticated) return  <Navigate to={'/login'} replace/>



    return (

        <Outlet/>

    )
};

// outlet basicamente te dice que continue su ciclo el programa en el frontend,
//  el replace de navigate te reemplaza toda la url y te la limpia a donde quieres

export default ProtectedRoute;