import React from 'react'
const Option = (props) => {

    return (
        props.options.map((option, key) => {
            return (
                <span
                className="sppb-custom-option"
                key={`sppb-custom-select-${key}`}
                onClick={() => props.selectOption(key, option.value)}
                >
                    {(props.selectedIcon && (props.selectedItem === key) && !props.styleTwo) && <i className={`${props.selectedIcon}`}></i>}
                    {(props.styleTwo && option.icon) && <span className="sppb-option-wrap"><i className={`${option.icon} sppb-option-icon`}></i><span className="sppb-option-label">{option.value}</span></span>}
                    {!props.styleTwo && option.value}
                </span>
            );
        })
    )
}

export default Option;