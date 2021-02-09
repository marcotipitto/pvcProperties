import React from 'react';
import { connect } from 'react-redux';
import { loginUser, userAuthenticated } from 'actions';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const { createContext, useContext } = React;
const AuthContext = createContext(null);

const AuthBaseProvider = ({children, dispatch}) => {

    const checkAuthState = () => {
        const decodedToken = decodeToken(getToken());
        if (decodedToken && moment().isBefore(getExpiration(decodedToken))) {
            dispatch(userAuthenticated(decodedToken));
        }
    }

    const isAuthenticated = () => {
        const decodedToken = decodeToken(getToken());
        return decodedToken && isTokenValid(decodedToken);
    }

    const isTokenValid = decodedToken => decodedToken && moment().isBefore(getExpiration(decodedToken))

    const getToken = () =>  localStorage.getItem('pvc_token');

    const getExpiration = decodedToken => moment.unix(decodedToken.exp);

    const decodeToken = token => jwt.decode(token);

    const signIn = (loginData) => {
        return loginUser(loginData)
            .then(token=> {
                localStorage.setItem('pvc_token', token);
                const decodedToken = decodeToken(token);
                dispatch(userAuthenticated(decodedToken));
                return token;
            });
    }

    const signOut = () => {
        localStorage.removeItem('pvc_token');
        dispatch({
            type: 'USER_SIGNOUT'
        })
    }

    const authApi = {
        signIn,
        checkAuthState,
        signOut,
        isAuthenticated
    }

    return (
        <AuthContext.Provider value={authApi}>
            {children}
        </AuthContext.Provider>
    );
}

export const AuthProvider = connect()(AuthBaseProvider);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const withAuth = Component => props => 
    <AuthContext.Consumer>
        {(authApi) => <Component {...props} auth={authApi}/>}
    </AuthContext.Consumer>

    
