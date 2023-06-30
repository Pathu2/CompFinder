import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateComponent() {
    const auth = localStorage.getItem("user");
    if(auth)
    {
        return <Outlet/>;
        /*Outlet is used to let possible the nested routing
        here if the user is logged in then we will let the routing happen
        by returing outlet.*/
    }
    else
    {
        return <Navigate to="/signup" />
        /*But if the user is not logged in we will nagivate to signup page */
    }
}

export default PrivateComponent
