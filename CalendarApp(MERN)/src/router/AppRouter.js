import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const {checking, uid} = useSelector( state => state.auth );

    const dispatch = useDispatch();


    useEffect(() => {
      
        dispatch(startChecking())
    }, [dispatch]);
    


    if(checking){
        return (<h5>Espere...</h5>);
    }

    return (
        <BrowserRouter>
            <div>
                <Routes>

                    <Route path="/login/" element={<PublicRoute isAuthenticated={!!uid} component={LoginScreen}/>}>
                            <Route element={<LoginScreen />} />
                    </Route>

                    <Route path="/" element={<PrivateRoute isAuthenticated={!!uid} component={CalendarScreen}/>}>
                            <Route element={<CalendarScreen />} />
                    </Route>


                    <Route 
                        path="*" 
                        element={<Navigate to="/" />} 
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
};
