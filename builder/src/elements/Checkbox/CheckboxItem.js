import React from "react";
const CheckboxItem = ({
    name,
    checked = false,
    onChange,
    id,
    value
}) => (
    <React.Fragment>
        <input
            type="checkbox"
            name={name}
            checked={checked}
            id={id}
            onChange={onChange}
            value={value}
        />
        <label htmlFor={id} className="sppb-checkbox-label">
            {name}
        </label>
    </React.Fragment>
);

export default CheckboxItem;
