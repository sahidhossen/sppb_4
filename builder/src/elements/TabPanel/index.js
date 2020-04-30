import React, { Component } from "react";
import withInstanceId from "../../lib/withInstanceId";

const TabHeader = ({ className, tabId, selected, onClick, children }) => (
  <button
    className={className}
    id={tabId}
    tabIndex={selected ? null : -1}
    onClick={onClick}
  >
    {children}
  </button>
);
export class TabPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { value, tabs } = this.props;
    if (value) {
      const defaultTabItem = tabs.find((tab) => tab.name === value);
      defaultTabItem && this.setState({ selectedTab: defaultTabItem });
    }
  }

  handleClick(selectedTab) {
    const { onSelect } = this.props;
    this.setState({ selectedTab });
    onSelect(selectedTab);
  }

  render() {
    const { selectedTab } = this.state;
    const { className, activeClass, tabs, children, instanceId } = this.props;
    const defaultClass = "sppb-tab-panel sppb-form-controllers";
    const elementClass = [defaultClass, ...(className ? [className] : [])].join(
      " "
    );

    return (
      <React.Fragment>
        <div className={elementClass}>
          {tabs.map((tab) => (
            <TabHeader
              className={[
                tab.className,
                ...(selectedTab && selectedTab.name === tab.name
                  ? [activeClass]
                  : []),
              ].join(" ")}
              tabId={`${instanceId}-${tab.name}`}
              selected={selectedTab && tab.name === selectedTab.name}
              key={tab.name}
              onClick={() => this.handleClick(tab)}
            >
              {tab.title}
            </TabHeader>
          ))}
        </div>
        {selectedTab && (
          <div
            className="sppb-tab-content"
            id={`${instanceId}-${selectedTab.name}`}
            tabIndex="0"
          >
            {children(selectedTab)}
          </div>
        )}
      </React.Fragment>
    );
  }
}

TabPanel.defaultProps = {
  className: "",
  activeClass: "active-tab",
  value: "",
};

export default withInstanceId(TabPanel);
