import React, {useEffect, useState} from 'react';
import {Container} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {useParams} from "react-router";
import Preloader from "../../components/Preloader";
import StudentTesting from "../../components/StudentTesting";
import {getTesting, updateTesting, endTest} from "../../actions/testing";
import './styles.scss';

const Testing = ({
    testing,
    getTesting,
    updateTesting,
    endTest
}) => {
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!testing) {
            getTesting(params.id).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Preloader />
    }

    return (
        <div className="page">
            <Container className="Testing">
                <div className="head">
                    <h2>Test: {testing.testData.name}</h2>
                </div>
                <StudentTesting
                    data={testing}
                    onResponse={(data) => updateTesting(params.id, data)}
                    endTest={() => endTest(params.id)}
                />
            </Container>
        </div>
    );
};

const actions = { getTesting, updateTesting, endTest };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ testing }) => ({
   testing,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Testing);
