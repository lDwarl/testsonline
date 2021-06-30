import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Button, Container} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import QuestionList from "../../../components/QuestionList";
import {useParams} from "react-router";
import { getAllTests, addTestQuestion, removeTestQuestion } from "../../../actions/test";
import Preloader from "../../../components/Preloader";
import AddQuestionForm from "../../../components/AddQuestionForm";

import "./styles.scss";
import ConfirmModal from "../../../components/Modals/ConfirmModal";

const AdminOneTest = ({
    tests,
    getAllTests,
    addTestQuestion,
    removeTestQuestion,
}) => {
    const params = useParams();
    const test = tests.filter(test => test._id === params.id).shift();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);

    useEffect(() => {
        if (!test) {
            getAllTests()
        }
    });

    if (!test) {
        return <Preloader />;
    }

    return (
        <div className="page">
            <Container className="AdminOneTest">
                { openRemoveModal &&
                <ConfirmModal
                    confirmCb={() => removeTestQuestion(params.id, openRemoveModal)}
                    close={() => setOpenRemoveModal(false)}
                    text="Are you sure?"
                    open={true}
                />}
                <div className="head">
                    <h3>"{test.name}" questions: </h3>
                    <Button onClick={() => setIsFormOpen(!isFormOpen)}>{ isFormOpen ? "Close" : "Add"}</Button>
                </div>
                { isFormOpen &&
                <AddQuestionForm
                    closeForm={() => setIsFormOpen(false)}
                    saveFunction={(data) => addTestQuestion(params.id, data)}
                />}
                <QuestionList data={test} removeQuestion={setOpenRemoveModal} />
            </Container>
        </div>
    );
};

AdminOneTest.propTypes = {
    tests: PropTypes.object.isRequired,
    getAllTests: PropTypes.func.isRequired,
    addTestQuestion: PropTypes.func.isRequired,
    removeTestQuestion: PropTypes.func.isRequired,
};

const actions = { getAllTests, addTestQuestion, removeTestQuestion };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ test }) => ({
   tests: test,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminOneTest);
