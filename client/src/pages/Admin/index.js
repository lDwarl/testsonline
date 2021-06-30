import React, {useEffect, useState} from 'react';
import {Container} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import TestingList from "../../components/TestingList";
import Preloader from "../../components/Preloader";
import {getAllTesting} from "../../actions/testing";

const Admin = ({
    getAllTesting,
    testingList,
}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllTesting().finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <div className='page'>
            <Container className="Admin">
                <div className="head">
                    <h2>Last testing: </h2>
                </div>
                <TestingList data={testingList} />
            </Container>
        </div>
    );
};

const actions = { getAllTesting };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ testing }) => ({
    testingList: testing,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);
