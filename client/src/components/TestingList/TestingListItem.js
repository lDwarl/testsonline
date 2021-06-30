import React from 'react';
import {useHistory} from "react-router-dom";
import {ADMIN_TESTING_DETAIL_ROUTE} from "../../utils/routesConst";

const TestingListItem = ({ data }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(ADMIN_TESTING_DETAIL_ROUTE + `/${data._id}`);
    }

    return (
        <div className="TestingListItem" onClick={() => handleClick()}>
            <div className="data">
                <div>
                    <span>Name: </span> {data.userName}
                </div>
                <div>
                    <span>Subject: </span> {data.subjectData.name}
                </div>
                <div>
                    <span>Test: </span> {data.testData.name}
                </div>
            </div>
            <div className="mark">
                <div>
                    <span>Correct answer: </span> {data.mark.correctAnswers} / {data.mark.testCount}
                </div>
                <div>
                    <span>Correct answers percent: </span> {data.mark.correctInPercent} %
                </div>
            </div>
        </div>
    );
};

export default TestingListItem;
