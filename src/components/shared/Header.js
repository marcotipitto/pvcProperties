/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RentalSearchInput from 'components/rental/RentalSearchInput';

const Header = ({ username, isAuth, signOut }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">PVC Properties</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <RentalSearchInput />
                <ul className="navbar-nav ml-auto">
                    {isAuth &&
                        <li className="nav-item active">
                            <div className="nav-link">Welcome {username}</div>
                        </li>
                    }
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    {isAuth &&
                        <>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Manage
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/rentals/new">New Rental</Link>
                                    <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div 
                                    onClick={signOut}
                                    className="nav-link"
                                >
                                    Logout
                                </div>
                            </li>
                        </>
                    }

                    {!isAuth &&
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Admin Login</Link>
                            </li>
                        </>
                    }

                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        username: auth.username,
        isAuth: auth.isAuth
    }
}

export default connect(mapStateToProps)(Header)