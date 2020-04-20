import React, { Component } from "react";
import { DragSource } from "react-dnd";
import { withDispatch } from "store";
import { flowRight as compose } from 'lodash';
import { Types } from "../../../../actions/dragType";

const addonSource = {
  beginDrag(props) {
      console.log("begin")
    return {
      type: "ADD_ADDON",
      name: props.addon.addon_name,
      addon: props.addon
    };
  },

  endDrag(props, monitor, component) {
    let result = monitor.getDropResult();
    if (result && result.status) {
      const addonName = props.addon.addon_name.replace(/sp_/g, "");
      let indexPosition = result.index;
      if (result.dropPosition == "bottom") {
        indexPosition = result.index + 1;
      }
       
   
      if (props.addon.js_template) {
        // Add addon on drop
        props.addAddon(addonName, result.addonId, indexPosition, {} )

      } else {
        const newAddonId = new Date().getTime();
        jQuery.ajax({
          type: "POST",
          url:
            pagebuilder_base +
            "index.php?option=com_sppagebuilder&view=ajax&format=json&callback=setting_value",
          dataType: "json",
          data: {
            id: newAddonId,
            name: addonName
          },
          cache: false,
          success: function(response) {
              console.log("addonlistItem: ajax res: ", response)
            // newAddon.settings.htmlContent = response.html;
            // newAddon.settings.assets = response.assets;
            // newAddon.settings.formData = JSON.parse(response.formData);

            // props.onSettingsClick(newAddon);
          }.bind(this)
        });
      }
    }
  }
};

class AddonListItem extends Component {
  render() {
    const { connectDragPreview, connectDragSource, addon } = this.props;
    return connectDragPreview(
      <div className="sppb-addon-list-item">
        {connectDragSource(
          <div>
            <img src={addon.icon} alt={addon.title} />
            <span className="sppb-addon-list-item-title">{addon.title}</span>
          </div>
        )}
      </div>
    );
  }
}

const DragSourceDecorator = DragSource(Types.ADDON, addonSource, function(
  connect,
  monitor
) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
});


export default compose([ 
  withDispatch( dispatch => {
    const {saveSetting, addAddon} = dispatch();
    return {
      onSettingsClick(options) {
        saveSetting(options);
      },
      addAddon(name, parentId, index, attributes) {
        addAddon({ name, parentId, index, attributes });
      }
    }
  }),
])(DragSourceDecorator(AddonListItem));
