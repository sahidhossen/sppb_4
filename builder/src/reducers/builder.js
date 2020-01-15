import initialState from "./initialState";
import _ from 'lodash';

const builder = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BLOCK":
      const builder = _.clone(state.builder);
      let {
        defaultAddon,
        payload: { index, parentId }
      } = action;
      /**
       * Get static block by block name
       * Update parent children attribute
       * Add block to the state
       * */

      builder[defaultAddon.id] = defaultAddon;
      builder[defaultAddon.id].parentId = parentId; // Add parent Id
      builder[parentId].childrens.splice(index, 0, defaultAddon.id);

      return {
        ...state,
        builder: { ...builder }
      };

    case "SET_ATTRIBUTE": {
      const { builder } = state;
      const {
        payload: { id },
        payload: { attr }
      } = action;
      builder[id].attributes = { ...attr, ...{ ...builder[id].attributes } };
      return {
        ...state,
        builder: { ...builder }
      };
    }

    case "ADD_SECTION":
      return {
        ...state,
        sections: action.payload
      };
    default:
      return state;
  }
};

export default builder;
