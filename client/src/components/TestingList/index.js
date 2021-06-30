import React from 'react';
import TestingListItem from "./TestingListItem";
import "./styles.scss";

const TestingList = ({
    data,
}) => {
    return (
        <div className="TestingList">
            { data.length === 0 ?
                <div className="empty">No tests completed yet!</div>
                :
                data.map(testing => <TestingListItem key={testing._id} data={testing} />)
            }
        </div>
    );
};

export default TestingList;
