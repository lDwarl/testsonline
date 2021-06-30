import React, {useEffect, useState} from 'react';
import {Button} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {useHistory} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/routesConst";
import {getTesting} from "../../actions/testing";
import Preloader from "../Preloader";

const TestingResult = ({ id, endTest, getTesting, data }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => getTesting(id).finally(
            () => setLoading(false)
        ), 2500);
    }, []);

    if (loading) {
        return <Preloader />;
    }

    const { studentAnswers } = data;
    const correctAnswers = studentAnswers.filter(ans => ans.answer.isTrue);
    const correctInPercent = 100 / studentAnswers.length * correctAnswers.length;

    const endTestHandler = () => {
        history.push(HOME_ROUTE);
        endTest();
    }

    return (
        <div className="TestingResult">
            <div className="head">
                <h2>Results:</h2>
            </div>
            <div className="results">
                <div>
                    <span>Correct answers: </span>
                    {correctAnswers.length} / {studentAnswers.length}
                </div>
                <div>
                    <span>Percent of correct answers:</span>
                    {correctInPercent}%
                </div>
            </div>
            <div className="actions">
                <Button onClick={() => endTestHandler()}>End test</Button>
            </div>
        </div>
    );
};

const actions = { getTesting };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ testing }) => ({
    data: testing,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestingResult);
