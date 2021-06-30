import React, {useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Input, Modal} from "semantic-ui-react";
import {createTest, editTest} from "../../../actions/test";
import CustomSelect from "../../CustomSelect";
import './styles.scss';

const TestModal = ({
    open,
    close,
    subjects,
    createTest,
    test,
    editTest,
}) => {
    const selectOptions = subjects.map(subject => ({ id: subject._id, text: subject.name}));
    let currentSubject = null;

    if (test) {
        currentSubject = subjects.filter(subject => subject._id === test.subject).shift();
    }

    const [error, setError] = useState(false);
    const [subjectId, setSubjectId] = useState(test ? test.subject : null);
    const [name, setName] = useState(test ? test.name : '');

    const handleCreate = () => {
        createTest({ name, subject: subjectId });
        close();
    };

    const handleUpdate = () => {
        editTest(test._id, { name, subject: subjectId });
        close();
    };

    return (
        <Modal
            className="TestModal"
            onClose={close}
            open={open}
        >
            <Modal.Header>{ test ? 'Update test:' : 'Create new test:' }</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    { error && <div className="error">{error}</div>}
                    <Input
                        placeholder="Test name ..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <CustomSelect placeholder={ currentSubject ? `${currentSubject.name}` : "Choose subject ..." } options={selectOptions} returnValueFunc={setSubjectId}/>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                { test ?
                    <Button color="teal" onClick={handleUpdate}>Update</Button>
                    :
                    <Button color="teal" onClick={handleCreate}>Create</Button>
                }
            </Modal.Actions>
        </Modal>
    );
};

TestModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    subjects: PropTypes.array.isRequired,
    createTest: PropTypes.func.isRequired,
    editTest: PropTypes.func.isRequired,
    test: PropTypes.object,
};

const actions = { createTest, editTest };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(TestModal);
