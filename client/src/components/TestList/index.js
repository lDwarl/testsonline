import React from 'react';
import PropTypes from 'prop-types';
import TestListItem from "./TestListItem";

import "./styles.scss";

const TestList = ({
    tests,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="TestList">
            { tests.length === 0 ?
                <div className="empty">No tests yet!</div>
                :
                tests.map(test => <TestListItem key={test._id} data={test} onEdit={onEdit} onDelete={onDelete} />)
            }
        </div>
    );
};

TestList.propTypes = {
    tests: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default TestList;
