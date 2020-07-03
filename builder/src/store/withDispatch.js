import React, { Component } from "react";
import { mapValues } from "lodash";
import { createHigherOrderComponent } from "../components";
import { RegistryConsumer } from "./registryProvider";

/**
 * Higher-order component used to add dispatch props using registered action
 * creators.
 *
 *
 * @return {Component} Enhanced component with merged dispatcher props.
 */
const withDispatch = (mapDispatchToProps) =>
  createHigherOrderComponent((WrappedComponent) => {
    class ComponentWithDispatch extends Component {
      constructor(props) {
        super(...arguments);

        this.proxyProps = {};

        this.setProxyProps(props);
      }

      proxyDispatch(propName, ...args) {
        // Original dispatcher is a pre-bound (dispatching) action creator.
        mapDispatchToProps(this.props.registry.dispatch, this.props.ownProps, this.props.registry)[propName](...args);
      }

      setProxyProps(props) {
        const propsToDispatchers = mapDispatchToProps(
          this.props.registry.dispatch,
          props.ownProps,
          this.props.registry
        );
        this.proxyProps = mapValues(propsToDispatchers, (dispatcher, propName) => {
          if (typeof dispatcher !== "function") {
            // eslint-disable-next-line no-console
            console.warn(`Property ${propName} returned from mapDispatchToProps in withDispatch must be a function.`);
          }
          if (this.proxyProps.hasOwnProperty(propName)) {
            return this.proxyProps[propName];
          }

          return this.proxyDispatch.bind(this, propName);
        });
      }

      render() {
        return <WrappedComponent {...this.props.ownProps} {...this.proxyProps} />;
      }
    }

    return (ownProps) => (
      <RegistryConsumer>
        {(registry) => <ComponentWithDispatch ownProps={ownProps} registry={registry} />}
      </RegistryConsumer>
    );
  }, "withDispatch");

export default withDispatch;
