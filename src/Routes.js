import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import AuthRoute from './components/auth/AuthRoute';
import GuestRoute from './components/auth/GuestRoute';

import RentalHome from './pages/RentalHome';
import Login from './pages/Login';
import Register from './pages/Register';
import RentalDetail from './pages/RentalDetail';
import SecretPage from './pages/SecretPage';
import RentalNew from './pages/RentalNew'
import RentalHomeSearch from 'pages/RentalHomeSearch';

const Routes = () => {
    return (
        <div className="container pvc-container">
            <Switch>
                <Route exact path='/'>
                    <RentalHome />
                </Route>
                <Route exact path='/rentals/:location/homes'>
                    <RentalHomeSearch />
                </Route>
                <AuthRoute path='/rentals/new'>
                    <RentalNew />
                </AuthRoute>
                <Route path='/rentals/:id'>
                    <RentalDetail />
                </Route>
                <AuthRoute path='/secret'>
                    <SecretPage />
                </AuthRoute>
                <GuestRoute path='/login'>
                    <Login />
                </GuestRoute>
                <GuestRoute path='/register'>
                    <Register />
                </GuestRoute>
            </Switch>
        </div>
    )
}

export default Routes