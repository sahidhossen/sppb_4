import React, { createElement } from "react";
import { flow } from "lodash";
import ReduxProvider from "./ReduxProvider";
import { Provider as SlotFillProvider } from "../slot-fill";
import Builder from "../Builder";

/**
 * In future multiple provider purpose
 */
class PageBuilderProvider extends React.Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    let { props } = this;
    let providers = [[SlotFillProvider]];
    const createEditorElement = flow(
      providers.map(([Provider, props]) => (arg) => createElement(Provider, props, arg))
    );
    return createEditorElement(props.children);
  }
}

export const SppbEditor = () => {
  return (
    <ReduxProvider>
      <PageBuilderProvider>
        <Builder />
      </PageBuilderProvider>
    </ReduxProvider>
  );
};
