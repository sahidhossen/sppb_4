import React from "react";
import classname from 'classnames/bind';

const Button = props => {
    const {
        btnText = "Publish",
        isPrimary,
        isSecondary,
        isTartiary,
        href,
        targetBlank, // Without {href} it will not work
        disabled,
        hasIcon, // Without {isSmall} icon props it will not work, Also add icon class here
        isSmall // Without {hasIcon} icon props it will not work
    } = props;

    const classNames = classname({
        'sppb-btn': true, 
        'sppb-btn-primary' : isPrimary,
        'sppb-btn-secondary' : isSecondary,
        'disabled': disabled,
        'sppb-btn-has-icon': hasIcon && isSmall,
        'sppb-btn-tartiary' : !href && isTartiary    
    })
    
    return href ? (
        <a
            href={href}
            className={classNames}
            target={targetBlank ? '_blank' : ''}
        >
            {hasIcon && isSmall ? <i className={hasIcon}></i> : ""}
            {btnText}
        </a>
    ) : (
        <button className={classNames}>
            {hasIcon && isSmall ? <i className={hasIcon}></i> : ""}
            {btnText}
        </button>
    );
};

export default Button;
