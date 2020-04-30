import React from 'react'
const SelectedItem = (props) => {
    return (
        <div className="sppb-custom-selected-item">
            <span className="sppb-selected-text">{props.optionSelected.value}</span>
            <span className="sppb-select-arrow">
                <i className="fas fa-caret-up sppb-option-arrow-up"></i>
                <i className="fas fa-caret-down sppb-option-arrow-down"></i>
            </span>
        </div>
    )
}
export default SelectedItem;