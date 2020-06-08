import React from "react";
import RadioOptions from "./RadioOptions";
class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            checkedItem: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }
    /**
     * Setting intial moment selected radio
     */
    componentWillMount() {
        const { options } = this.props;
        options.map((option, i) => {
            if (option.isChecked) {
                this.setState({
                    isChecked: true,
                    checkedItem: option.value
                });
            }
        });
    }

    //Change state on radio button click
    handleChange(item) {
        const { onRadioChange } = this.props;
        this.setState({
            isChecked: true,
            checkedItem: item
        });
        onRadioChange(item);
    }

    render() {
        const { isChecked, checkedItem } = this.state;
        const { options, title, className } = this.props;
        return (
            <div className={`editor-x-form-controllers sppb-radio-buttons${className ? ' ' + className : ''}`}>
                {title && <h3 className="sppb-radio-title">{title}</h3>}
                <div className="sppb-radio-button-wrap">
                    <RadioOptions
                        isChecked={isChecked}
                        checkedItem={checkedItem}
                        options={options}
                        title={title}
                        handleChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

export default RadioButton;
