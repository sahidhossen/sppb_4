import Paragraph from "./Paragraph";
import { revisedRandId } from "../../lib/utils";

export default {
  id: revisedRandId(),
  name: "Paragraph",
  title: "Paragraph",
  icon: "fa fa-paragraph",
  category: "Text",
  childrens: [],
  attributes: {
    class: "sppb-paragraph",
    color: "red",
  },
  content: "",
  Component: Paragraph,
};
