import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {useHistory} from "react-router-dom";
import {Button, Container, Input} from "semantic-ui-react";
import {login} from "../../../actions/auth";
import {ADMIN_HOME} from "../../../utils/routesConst";
import './styles.scss';

const AdminLogin = ({
    login,
}) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        login({email, password})
            .then((res) => res && history.push(ADMIN_HOME));
    };

    return (
        <div className="page">
            <Container className="AdminLogin">
                <div className="content">
                    <h3>Enter to the admin panel:</h3>
                    <Input
                        placeholder="Email ..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Password ..."
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="button" onClick={handleClick}>Sign in</Button>
                </div>
            </Container>
        </div>
    );
};

AdminLogin.propTypes = {
    login: PropTypes.func.isRequired
}

const actions = { login };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(null, mapDispatchToProps)(AdminLogin);
