import React, {useState} from 'react';
import {Button, TextArea} from "semantic-ui-react";
import AnswerElement from "./AnswerElement";
import "./styles.scss";

const AddQuestionForm = ({ closeForm, saveFunction }) => {
    const [error, setError] = useState(false);
    const [question, setQuestion] = useState('');

    const [answer1, setAnswer1] = useState({ answer: '', isTrue: false });
    const [answer2, setAnswer2] = useState({ answer: '', isTrue: false });
    const [answer3, setAnswer3] = useState({ answer: '', isTrue: false });
    const [answer4, setAnswer4] = useState({ answer: '', isTrue: false });

    const handleSave = () => {
        const answers = [answer1, answer2, answer3, answer4];

        const correctAnswer = answers.filter(ans => ans.isTrue === true).shift();
        const emptyAnswers = answers.filter(ans => !ans.answer);

        if (emptyAnswers.length) {
            return setError('Answers can\'t be empty!');
        }

        if (!correctAnswer) {
            return setError('No correct answer!');
        }

        if (!question) {
            return setError('Question is empty!');
        }

        setError(false);
        saveFunction({ question, answers });
        closeForm();
    };

    return (
        <div className="AddQuestionForm">
            { error && <div className="error">{error}</div> }
            <TextArea
                placeholder="Question ..."
                value={question}
                onChange={e => setQuestion(e.target.value)}
            />
            <div className="answers">
                <AnswerElement returnDataFunc={(v, b) => setAnswer1({ answer: v, isTrue: b })} />
                <AnswerElement returnDataFunc={(v, b) => setAnswer2({ answer: v, isTrue: b })}  />
                <AnswerElement returnDataFunc={(v, b) => setAnswer3({ answer: v, isTrue: b })} />
                <AnswerElement returnDataFunc={(v, b) => setAnswer4({ answer: v, isTrue: b })} />
            </div>
            <div className="action">
                <Button onClick={() => handleSave()}>Save</Button>
            </div>
        </div>
    );
};

export default AddQuestionForm;
