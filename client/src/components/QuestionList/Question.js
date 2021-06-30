import React from 'react';
import PropTypes from "prop-types";
import {Icon} from "semantic-ui-react";

const Question = ({ question, onRemove }) => {
    return (
        <div className="Question">
            <h2>
                <span>{ question.question }</span>
                <Icon name="remove circle" onClick={() => onRemove(question.question)} />
            </h2>
            <div className="answers">
                { question.answers.map((answer, i) =>
                    <div
                        key={i}
                        className={answer.isTrue ? "correct" : "incorrect"}
                    >
                        {answer.answer}
                    </div>
                ) }
            </div>
        </div>
    );
};

Question.propTypes = {
    question: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default Question;
