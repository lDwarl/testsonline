import React, {useState} from 'react';
import "./styles.scss";

const CustomSelect = ({
  placeholder,
  options,
  returnValueFunc,
  defaultValue = false,
}) => {
    const [openList, setOpenList] = useState(false);
    const [selectedOption, setSelectedOption] = useState(placeholder);

    const handleClick = (id, text) => {
        returnValueFunc(id);
        setSelectedOption(text)
        setOpenList(false);
    };

    return (
        <div className={openList ? "CustomSelect active" : "CustomSelect"}>
            <span
                className={selectedOption !== placeholder && 'chosen'}
                onClick={() => setOpenList(!openList)}
            >
                { !defaultValue ? selectedOption : placeholder }
            </span>
            { openList &&
            <div className="items">
                { (options && options.length) ?
                    options.map(option =>
                        <span
                            className="el"
                            key={option.id}
                            onClick={() => handleClick(option.id, option.text)}
                        >
                            {option.text}
                        </span>
                    )
                    : <span className="el"></span>
                }
            </div>
            }
        </div>
    );
};

export default CustomSelect;
