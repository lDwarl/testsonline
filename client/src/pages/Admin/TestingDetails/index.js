import React, {useEffect, useState} from 'react';
import {Container} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getAllTesting} from "../../../actions/testing";
import Preloader from "../../../components/Preloader";
import {useParams} from "react-router";
import "./styles.scss";

const AdminTestingDetails = ({ getAllTesting, allTesting }) => {
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       if (!allTesting) {
           getAllTesting().finally(() => setLoading(false));
       } else {
           setLoading(false);
       }
    }, []);

    if (loading) {
        return <Preloader />;
    }

    const data = allTesting.filter(testing => testing._id === params.id)[0];

    return (
        <div className="page">
            <Container className="AdminTestingDetails">
                { !data ?
                    <div className="error">Error! Please try later!</div>
                    :
                    <div className="details">
                        <div className="head">
                            <div>
                                <span>Student: </span>{ data.userName }
                            </div>
                            <div>
                                <span>Test: </span>{ data.testData.name }
                            </div>
                        </div>
                        <h2>Test details: </h2>
                        {data.studentAnswers.map((item, index) =>
                            <div key={index} className="answers">
                                <div className="question">{item.question}</div>
                                <div className="answer">
                                    <span className={item.answer.isTrue ? "correct" : "incorrect"}>{item.answer.answer}</span>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </Container>
        </div>
    );
};

const actions = { getAllTesting };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ testing }) => ({
   allTesting: testing,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminTestingDetails);
