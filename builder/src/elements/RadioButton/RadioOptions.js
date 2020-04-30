import React, { Fragment } from "react";
const RadioOptions = props => {
    return props.options.map((option, key) => {
        return (
            <Fragment key={`fragment-${key}`}>
                <input
                    type="radio"
                    name={props.title}
                    value={option.value}
                    id={`${option.label}-${key}`}
                    checked={
                        props.isChecked && props.checkedItem === option.value
                            ? true
                            : false
                    }
                    onChange={() => props.handleChange(option.value)}
                />
                <label
                    htmlFor={`${option.label}-${key}`}
                    className="sppb-radio-buttons-label"
                >
                    {option.label}
                </label>
            </Fragment>
        );
    });
};

export default RadioOptions;
