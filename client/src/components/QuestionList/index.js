import React from 'react';
import PropTypes from "prop-types";
import Question from "./Question";

import "./styles.scss";

const QuestionList = ({ data, removeQuestion }) => {
    return (
        <div className="QuestionList">
            { data.questions.length === 0 ?
                <div className="empty">No questions yet!</div>
                :
                data.questions.map((question, i) =>
                    <Question
                        key={i}
                        question={question}
                        onRemove={removeQuestion}
                    />)
            }
        </div>
    );
};

QuestionList.propTypes = {
    data: PropTypes.object.isRequired,
    removeQuestion: PropTypes.func.isRequired,
};

export default QuestionList;
