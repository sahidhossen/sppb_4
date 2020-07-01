import fonts from "./defualtFont";

const initialState = {
  fonts: fonts,
  images: {},
};

const AssetsStore = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FONTS": {
      // BLOCK STATE
      return { ...state };
    }
    default:
      return state;
  }
};

export default AssetsStore;
