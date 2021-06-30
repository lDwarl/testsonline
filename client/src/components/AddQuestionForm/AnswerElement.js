import React, {useState} from 'react';
import {Checkbox, Input} from "semantic-ui-react";

const AnswerElement = ({
    placeholder = 'Answer ...',
    returnDataFunc = null,
}) => {
    const [data, setData] = useState('');
    const [isTrue, setIsTrue] = useState(false);

    const handleTextChange = (value) => {
        if (returnDataFunc) {
            returnDataFunc(value, isTrue);
        }

        setData(value);
    }

    const handleBoolChange = (value) => {
        if (returnDataFunc) {
            returnDataFunc(data, value);
        }

        setIsTrue(value);
    }



    return (
        <div className="AnswerElement">
            <Input
                placeholder={placeholder}
                value={data}
                onChange={e => handleTextChange(e.target.value)}
            />
            <Checkbox
                label='Answer correct?'
                value={isTrue}
                onChange={() => handleBoolChange(!isTrue)}
            />
        </div>
    );
};

export default AnswerElement;
