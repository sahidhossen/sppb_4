const data = {
  "079543af-25f4-ab9c-156a-8b66570bccfb": {
    id: "079543af-25f4-ab9c-156a-8b66570bccfb",
    name: "row",
    title: "Row",
    accept: "*",
    childrens: ["2883dcd5-4461-c446-2d28-5e3c68956845", "f0d23cca-fd1e-7304-96f6-f8746ab4cbd5"],
    styleBlockIds: [],
    attributes: {
      class: "sppb-row",
    },
    content: "",
    parentId: "root",
  },
  "2883dcd5-4461-c446-2d28-5e3c68956845": {
    id: "2883dcd5-4461-c446-2d28-5e3c68956845",
    name: "heading",
    title: "Heading",
    styleBlockIds: [],
    attributes: {
      class: "sppb-heading",
    },
    content: "",
    parentId: "079543af-25f4-ab9c-156a-8b66570bccfb",
  },
  "f0d23cca-fd1e-7304-96f6-f8746ab4cbd5": {
    id: "f0d23cca-fd1e-7304-96f6-f8746ab4cbd5",
    name: "heading",
    title: "Heading",
    styleBlockIds: [],
    attributes: {
      class: "sppb-heading",
    },
    content: "",
    parentId: "079543af-25f4-ab9c-156a-8b66570bccfb",
  },
};

import Root from "../addonLibrary/root";

const initialState = {
  root: { ...Root },
  ...data,
};

export default initialState;
