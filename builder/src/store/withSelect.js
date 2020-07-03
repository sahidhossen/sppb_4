import React, { Component } from "react";
import { isEqual } from "lodash";
import { createHigherOrderComponent } from "../components";
import { RegistryConsumer } from "./registryProvider";

const withSelect = (mapSelectToProps) =>
  createHigherOrderComponent((WrappedComponent) => {
    const DEFAULT_MERGE_PROPS = {};

    /**
     * Given a props object, returns the next merge props by mapSelectToProps.
     *
     * @param {Object} props Props to pass as argument to mapSelectToProps.
     *
     * @return {Object} Props to merge into rendered wrapped element.
     */
    function getNextMergeProps(props) {
      return mapSelectToProps(props.registry.select, props.ownProps, props.registry) || DEFAULT_MERGE_PROPS;
    }

    class ComponentWithSelect extends Component {
      constructor(props) {
        super(props);

        this.onStoreChange = this.onStoreChange.bind(this);
        this.subscribe(props.registry);
        this.mergeProps = getNextMergeProps(props);
      }

      componentDidMount() {
        this.canRunSelection = true;

        // A state change may have occurred between the constructor and
        // mount of the component in which case selection should be rerun.
        if (this.hasQueuedSelection) {
          this.hasQueuedSelection = false;
          this.onStoreChange();
        }
      }

      componentWillUnmount() {
        this.canRunSelection = false;
      }

      shouldComponentUpdate(nextProps, nextState) {
        // Cycle subscription if registry changes.
        const hasRegistryChanged = nextProps.registry !== this.props.registry;
        if (hasRegistryChanged) {
          this.unsubscribe();
          this.subscribe(nextProps.registry);
        }

        // Treat a registry change as equivalent to `ownProps`, to reflect
        // `mergeProps` to rendered component if and only if updated.
        const hasPropsChanged = hasRegistryChanged || !isEqual(this.props.ownProps, nextProps.ownProps);

        // Only render if props have changed or merge props have been updated
        // from the store subscriber.
        if (this.state === nextState && !hasPropsChanged) {
          return false;
        }

        if (hasPropsChanged) {
          const nextMergeProps = getNextMergeProps(nextProps);
          if (!isEqual(this.mergeProps, nextMergeProps)) {
            this.mergeProps = nextMergeProps;
          }
        }

        return true;
      }

      onStoreChange() {
        if (!this.canRunSelection) {
          this.hasQueuedSelection = true;
          return;
        }

        const nextMergeProps = getNextMergeProps(this.props);
        if (isEqual(this.mergeProps, nextMergeProps)) {
          return;
        }

        this.mergeProps = nextMergeProps;

        this.setState({});
      }

      subscribe(registry) {
        this.unsubscribe = registry.subscribe(this.onStoreChange);
      }

      render() {
        return <WrappedComponent {...this.props.ownProps} {...this.mergeProps} />;
      }
    }

    return (ownProps) => (
      <RegistryConsumer>
        {(registry) => <ComponentWithSelect ownProps={ownProps} registry={registry} />}
      </RegistryConsumer>
    );
  }, "withSelect");

export default withSelect;
