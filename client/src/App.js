import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {BrowserRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import ErrorMessage from "./components/ErrorMessage";
import Preloader from "./components/Preloader";
import {checkAuth} from "./actions/auth";

const App = ({ error, isAuth, isAdmin, checkAuth }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth().finally(() => setLoading(!loading));
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
    <BrowserRouter>
        { error.isError && <ErrorMessage error={error} /> }
        <Header />
        <AppRouter isAuth={isAuth} />
    </BrowserRouter>
    );
}

App.propTypes = {
    checkAuth: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

const actions = {
    checkAuth
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ error, user }) => ({
    error: error,
    isAdmin: user.isAdmin,
    isAuth: user.isAuth
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
