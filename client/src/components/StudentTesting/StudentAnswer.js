import React from 'react';

const StudentAnswer = ({ data, question, onResponse }) => {
    return (
        <div className="StudentAnswer" onClick={() => onResponse({ question, answer: data })}>
            {data.answer}
        </div>
    );
};

export default StudentAnswer;
