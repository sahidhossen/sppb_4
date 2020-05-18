import React from 'react';

class SpacingComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    onChange(type, event) {
        let name = event.target.name; 
        let value = event.target.value; 

        let { setCssAttributes, style } = this.props;
        let _value = style[name]
        if (type === 'value') {
            _value.value = value;
        }
        if (type === 'unit') {
            _value.unit = value;
        }
        console.log('value: ', _value)
        setCssAttributes({ [name]: {..._value} })

        // setCssAttributes({paddingLeft: {value, unit} })
    }

    render(){ 
        
        let {setCssAttributes, style} = this.props;
        let {paddingLeft, paddingRight} = style;
        console.log("spacing: ", style)
        return ( 
            <div className="editor-x-panel">
                <input type="text" value={paddingLeft.value} onChange={this.onChange.bind(this, 'value')} name="paddingLeft"/>
                <input type="text" value={paddingLeft.unit} onChange={this.onChange.bind(this, 'unit')} name="paddingLeft"/>
            </div>
        )
    }
}
export default SpacingComponent;