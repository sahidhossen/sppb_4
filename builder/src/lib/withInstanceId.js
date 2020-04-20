import React, { Component } from "react";
import {createHigherOrderComponent} from "../components/compose";

/**
 * A Higher Order Component used to be provide a unique instance ID by
 * component.
 *
 */
export default createHigherOrderComponent(WrappedComponent => {
  let instances = 0;

  return class extends Component {
    constructor() {
      super(...arguments);
      this.instanceId = instances++;
    }

    render() {
      return <WrappedComponent {...this.props} instanceId={this.instanceId} />;
    }
  };
}, "withInstanceId");
