const initialState = {
  accessibility: {
    title: "Accessibility Options",
    icon: "fab fa-accessible-icon",
    status: false,
  },
  rulers: {
    title: "Show Rulers",
    icon: "fas fa-ruler-combined",
    status: false,
  },
  grid: {
    title: "Edit Grid",
    icon: "fas fa-hashtag",
    status: true,
  },
  code: {
    title: "Edit code",
    icon: "fas fa-code",
    status: false,
  },
  components: {
    title: "Components",
    icon: "fas fa-th-large",
    status: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "EDIT_VIEW_CONTEXT_LIST":
      return { ...state, ...payload };
    default:
      return state;
  }
};
