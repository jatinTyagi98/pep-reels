import React from 'react';
import {Route} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Component } from 'react';
import { Redirect } from 'react-router';


function PrivateRouter({component:Component,...rest}) {
    const {user} = useContext(AuthContext);
    return (
       <Route {...rest}  render={ props => {
           return user ? <Component {...props}/>:<Redirect to='login'/>
       }} />
    )
}

export default PrivateRouter
