import React from "react";

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.defaultChecked || false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { isChecked } = this.state;
        const { onToogleChange } = this.props;
        this.setState({
            isChecked: !isChecked
        });
        onToogleChange(!isChecked)
    }

    render() {
        const { isChecked } = this.state;
        return (
            <div className="sppb-toggle-btn-wrap editor-x-form-controllers" onClick={this.handleClick}>
                <span className={`sppb-toggle-btn-body${isChecked ? ' sppb-toggle-btn-checked' : ''}`}>
                    <span className="sppb-toggle-btn-bubble"></span>
                </span>
            </div>
        );
    }
}

ToggleButton.defaultProps = {
    defaultChecked: false
}

export default ToggleButton;
