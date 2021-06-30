import React, {useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Input, Modal} from "semantic-ui-react";
import {createSubject, editSubject} from "../../../actions/subject";
import './styles.scss';

const SubjectModal = ({
    open,
    close,
    createSubject,
    subject,
    editSubject,
}) => {
    const [error, setError] = useState(false);
    const [name, setName] = useState(subject ? subject.name : '');

    const handleCreate = () => {
        createSubject({ name });
        close();
    };

    const handleUpdate = () => {
        editSubject(subject._id, { name });
        close();
    };

    return (
        <Modal
            className="SubjectModal"
            onClose={close}
            open={open}
        >
            <Modal.Header>{ subject ? 'Update subject:' : 'Create new subject:' }</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    { error && <div className="error">{error}</div>}
                    <Input
                        placeholder="Name of subject ..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                { subject ?
                    <Button color="teal" onClick={handleUpdate}>Update</Button>
                    :
                    <Button color="teal" onClick={handleCreate}>Create</Button>
                }
            </Modal.Actions>
        </Modal>
    );
};

SubjectModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    createSubject: PropTypes.func.isRequired,
    editSubject: PropTypes.func.isRequired,
    subject: PropTypes.object,
};

const actions = { createSubject, editSubject };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(SubjectModal);
