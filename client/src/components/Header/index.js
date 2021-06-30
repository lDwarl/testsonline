import React from 'react';
import {Link} from "react-router-dom";
import {ADMIN_HOME, ADMIN_SUBJECT_ROUTE, ADMIN_TEST_ROUTE, HOME_ROUTE} from "../../utils/routesConst";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";
import './styles.scss';

const Header = ({ isAdmin, logout }) => {
    return (
        <div className="Header">
            <div className="logo">
                <Link to={HOME_ROUTE}>Online tests</Link>
            </div>
            <div className="actions">
                {isAdmin ?
                    <>
                        <Link to={ADMIN_HOME}>Panel</Link>
                        <Link to={ADMIN_SUBJECT_ROUTE}>Subjects</Link>
                        <Link to={ADMIN_TEST_ROUTE}>Tests</Link>
                        <Link onClick={() => logout()}>Logout</Link>
                    </>
                    :
                    <></>
                }
            </div>
        </div>
    );
};

Header.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
}

const actions = { logout };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ user }) => ({
    isAdmin: user.isAdmin,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
