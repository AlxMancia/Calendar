import React from "react";

import { Navigate} from 'react-router-dom'

export const PublicRoute = ({isAuthenticated,component:Component,...rest}) =>{
    return isAuthenticated ? <Navigate to="/" />:<Component/>;
}