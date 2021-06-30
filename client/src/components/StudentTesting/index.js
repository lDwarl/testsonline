import React, {useEffect, useState} from 'react';
import StudentAnswer from "./StudentAnswer";
import TestingResult from "./TestingResult";

import './styles.scss';

const StudentTesting = ({
    data,
    onResponse,
    endTest,
}) => {
    const { questions } = data.testData;
    const questionCount = questions.length;

    const [currentQuestion, setCurrentQuestion] = useState(data.studentAnswers.length);

    const handleResponse = (data) => {
        onResponse(data);
        setCurrentQuestion(currentQuestion + 1);
    }

    return (
        <div className="StudentTesting">
            { currentQuestion < questionCount ?
                <>
                    <div className="question">
                        <span>{questions[currentQuestion].question}</span>
                        <span>Tests: {currentQuestion + 1} / {questionCount}</span>
                    </div>
                    <div className="answers">
                        { questions[currentQuestion].answers.map((answer, i) =>
                            <StudentAnswer
                                key={i}
                                data={answer}
                                question={questions[currentQuestion].question}
                                onResponse={handleResponse}
                            />)
                        }
                    </div>
                </>
                : <TestingResult id={data._id} endTest={endTest}/>
            }
        </div>
    );
};

export default StudentTesting;
