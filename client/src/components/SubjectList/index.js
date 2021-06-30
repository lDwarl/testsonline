import React from 'react';
import PropTypes from "prop-types";
import SubjectListItem from "./SubjectListItem";
import './styles.scss';

const SubjectList = ({ subjects, onEdit, onDelete }) => {
    return (
        <div className="SubjectList">
            { subjects.length === 0 ?
                <div className="empty">No subjects yet!</div>
                :
                subjects.map(subject =>
                    <SubjectListItem
                        key={subject._id}
                        data={subject}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />)
            }
        </div>
    );
};

SubjectList.propTypes = {
    subjects: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default SubjectList;
