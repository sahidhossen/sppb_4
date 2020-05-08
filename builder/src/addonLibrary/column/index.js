import Column from "./Column";
import { revisedRandId } from "../../lib/utils";

export default {
  id: revisedRandId(),
  name: "column",
  icon: "fa fa-columns",
  title: "Column",
  category: "Containers",
  childrens: [],
  attributes: {
    class: "sppb-column sppb-column-3",
    width: "50%",
    grid: 12,
  },
  content: [],
  droppable: true,
  accept: "*",
  Component: Column,
};
