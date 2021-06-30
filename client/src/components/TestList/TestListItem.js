import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {ADMIN_TEST_ROUTE} from "../../utils/routesConst";

const TestListItem = ({ data, onEdit, onDelete }) => {

    return (
        <div className="TestListItem">
            <div className="description">
                <span className="name">
                    <Link to={ADMIN_TEST_ROUTE + `/${data._id}`}>
                        <span>{ data.name }</span>
                        <span>{ data.subjectData.name }</span>
                    </Link>
                </span>
                <span className="edit" onClick={() => onEdit(data)}>
                    <Icon name="pencil alternate" />
                </span>
                <span className="remove" onClick={() => onDelete(data._id)}>
                    <Icon name="remove" />
                </span>
            </div>
        </div>
    );
};

TestListItem.propTypes = {
    data: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default TestListItem;
