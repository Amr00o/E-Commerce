import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import {Navigate} from 'react-router-dom';

function ProtctedRoute({children}) {

    let {userIsLoggendIn} = useContext(AuthContext)

    if(userIsLoggendIn){
        return children
    }else{
        return <Navigate to={'/login'}/>
    }
}
export default ProtctedRoute