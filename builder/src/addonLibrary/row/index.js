import Row from "./row";

export default {
  name: "row",
  title: "Row",
  icon: "fa fa-square-o",
  category: "Layouts",
  className: "sppb-row",
  attributes: {
    display: "grid",
    _addonWidth: 0,
    gridGap: "2px",
    gridCol: 10,
  },
  style: {
    backgroundColor: "rgba(0,0,0,0)",
    fontSize: "12px",
  },
  childrens: [],
  droppable: true,
  accept: ["column"],
  Component: Row,
};
