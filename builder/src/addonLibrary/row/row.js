import React from "react";
import classNames from "classnames/bind";
import AddonControls from '../../components/AddonControls';
import TagsBtn from '../../elements/TagsButton'

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  static templateSet() {
    return [
      { name: "column", attributes: { border: "1px solid red" } },
      { name: "column", attributes: { border: "1px solid green" } },
    ];
  }

  render() {
    const { addonId, attributes, className } = this.props;
    console.log("row:")
    const clsNames = classNames(addonId, 'sppb-row', className);

    return (
      <div data-id={addonId} className={clsNames}>
         <AddonControls>
          <p>It is working</p>
          <TagsBtn className="dfdsafdaf" url="https://joomshaper.com" text="Hero Title" style={{background:'#fd812b', color: '#fff'}}/>
        </AddonControls>
        {this.props.renderChildren()}
      </div>
    );
  }
}

export default Row;
