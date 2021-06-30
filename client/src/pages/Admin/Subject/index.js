import React, {useState} from 'react';
import {Button, Container} from "semantic-ui-react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import SubjectList from "../../../components/SubjectList";
import Preloader from "../../../components/Preloader";
import SubjectModal from "../../../components/Modals/SubjectModal";
import {getAllSubjects, removeSubject} from "../../../actions/subject";

import './styles.scss';
import ConfirmModal from "../../../components/Modals/ConfirmModal";

const AdminSubject = ({
    subjects,
    getAllSubjects,
    removeSubject
}) => {
    const [loading, setLoading] = useState(true);
    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useState(() => {
        getAllSubjects().finally(() => setLoading(!loading));
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <div className="page">
            <Container className="AdminSubject">
                { openCreateForm &&
                <SubjectModal
                    close={() => setOpenCreateForm(false)}
                    open={openCreateForm}
                />}
                { openUpdateForm && <SubjectModal
                    open={true}
                    close={() => setOpenUpdateForm(false)}
                    subject={openUpdateForm}
                />}
                { openDeleteModal &&
                <ConfirmModal
                    confirmCb={() => removeSubject(openDeleteModal)}
                    close={() => setOpenDeleteModal(false)}
                    text="Are you sure?"
                    open={true}
                />}
                <div className="head">
                    <h2>Subjects:</h2>
                    <Button onClick={() => setOpenCreateForm(!openCreateForm)}>Create</Button>
                </div>
                <SubjectList subjects={subjects} onEdit={setOpenUpdateForm} onDelete={setOpenDeleteModal}/>
            </Container>
        </div>
    );
};

AdminSubject.propTypes = {
    subjects: PropTypes.array.isRequired,
    getAllSubjects: PropTypes.func.isRequired,
    removeSubject: PropTypes.func.isRequired,
};

const actions = { getAllSubjects, removeSubject };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = ({ subject }) => ({
    subjects: subject,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSubject);
