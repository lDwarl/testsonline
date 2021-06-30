import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, Container} from "semantic-ui-react";
import TestList from "../../../components/TestList";
import TestModal from "../../../components/Modals/TestModal";
import Preloader from "../../../components/Preloader";
import { getAllTests, removeTest } from "../../../actions/test";
import {getAllSubjects} from "../../../actions/subject";

import "./styles.scss";
import ConfirmModal from "../../../components/Modals/ConfirmModal";

const AdminTest = ({
    tests,
    getAllTests,
    subjects,
    getAllSubjects,
    removeTest,
}) => {
    const [loading, setLoading] = useState(true);
    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        getAllTests().finally(() => setLoading(false));

        if (!subjects.length) {
            getAllSubjects();
        }
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <div className="page">
            <Container className="AdminTest">
                { openCreateForm &&
                <TestModal
                    open={openCreateForm}
                    close={() => setOpenCreateForm(false)}
                    subjects={subjects}
                />}
                { openUpdateForm &&
                <TestModal
                    open={true}
                    close={() => setOpenUpdateForm(false)}
                    subjects={subjects}
                    test={openUpdateForm}
                />}
                { openDeleteModal &&
                <ConfirmModal
                    confirmCb={() => removeTest(openDeleteModal)}
                    close={() => setOpenDeleteModal(false)}
                    text="Are you sure?"
                    open={true}
                />}
                <div className="head">
                    <h2>Tests:</h2>
                    <Button onClick={() => setOpenCreateForm(!openCreateForm)}>Create</Button>
                </div>
                <TestList tests={tests} onEdit={setOpenUpdateForm} onDelete={setOpenDeleteModal} />
            </Container>
        </div>
    );
};

AdminTest.propTypes = {
    tests: PropTypes.array.isRequired,
    getAllTests: PropTypes.func.isRequired,
    subjects: PropTypes.array.isRequired,
    getAllSubjects: PropTypes.func.isRequired,
    removeTest: PropTypes.func.isRequired,
};

const actions = { getAllTests, getAllSubjects, removeTest };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ test, subject }) => ({
    tests: test,
    subjects: subject,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminTest);
