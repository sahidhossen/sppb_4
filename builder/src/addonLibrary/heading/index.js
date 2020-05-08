import Heading from "./Heading";
import { revisedRandId } from "../../lib/utils";

export default {
  id: revisedRandId(),
  name: "Heading",
  title: "Heading",
  icon: "fa fa-heading",
  category: "Text",
  childrens: [],
  attributes: {
    class: "sppb-heading",
    color: "red",
    displayType: "grid",
    gridArea: "",
  },
  content: "",
  childrens: [],
  Component: Heading,
};
