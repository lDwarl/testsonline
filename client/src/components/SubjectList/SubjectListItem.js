import React from 'react';
import PropTypes from "prop-types";
import {Icon} from "semantic-ui-react";

const SubjectListItem = ({ data, onEdit, onDelete }) => {
    return (
        <div className="SubjectListItem">
            <span className="name">{ data.name }</span>
            <span className="edit" onClick={() => onEdit(data)}>
                <Icon name="pencil alternate" />
            </span>
            <span className="remove" onClick={() => onDelete(data._id)}>
                <Icon name="remove" />
            </span>
        </div>
    );
};

SubjectListItem.propTypes = {
    data: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default SubjectListItem;
