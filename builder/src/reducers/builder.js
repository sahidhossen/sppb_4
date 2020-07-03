import initialState from "./initialState";
import { insertAt, moveTo } from "../lib/array";
import { reduce, pullAt, castArray, cloneDeep } from "lodash";

const getMutateSafeObject = (original, working) => {
  if (original === working) {
    return { ...original };
  }
  return working;
};

const builder = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ADDON":
      const {
        defaultAddon,
        payload: { parentId, index },
      } = action;

      /**
       * Set default block with unique ID
       * Update parentId associated with the new Addon
       * Update parent Addon children array with currect index and new addonId
       * */

      return {
        ...state,
        [defaultAddon.id]: { ...defaultAddon, parentId: parentId },
        [parentId]: {
          ...state[parentId],
          childrens: insertAt(state[parentId].childrens, defaultAddon.id, index),
        },
      };
    case "TRANSFER_ADDON": {
      /**
       * Index: drop index
       * AddonId: source AddonId
       * parentId: Target addonId
       */
      const {
        payload: { index, addonId, parentId },
      } = action;

      const nextState = cloneDeep(state);

      /**
       * sourceAddon: Find parentId addon from source addon
       * Remove addonId from sourceParent children array
       *
       * Update SourceParent Childrens
       * Update destination children array with currect index and current addonId
       */
      const sourceAddon = nextState[addonId];

      const sourceParent = nextState[sourceAddon.parentId];
      const sourceAddonIndex = sourceParent.childrens.indexOf(addonId);
      // If source ParentId and target parentId not same then Do rest of the stuff
      if (sourceAddon.parentId !== parentId) {
        const childrens = [...sourceParent.childrens];
        pullAt(childrens, [sourceAddonIndex]);

        sourceParent.childrens = childrens;
        nextState[sourceParent.id] = { ...sourceParent };
        nextState[addonId] = { ...sourceAddon, parentId };
        // Insert into new addon
        nextState[parentId].childrens = insertAt(nextState[parentId].childrens, addonId, index);
      } else {
        // Move index position
        console.log("move");
        nextState[parentId].childrens = moveTo(nextState[parentId].childrens, sourceAddonIndex, index);
      }

      return nextState;
    }

    case "SET_ATTRIBUTE": {
      const { addonId, attributes } = action;
      // Ignore updates if block isn't known
      if (!state[addonId]) {
        return state;
      }
      // Consider as updates only changed values
      const updatedAttributes = reduce(
        attributes,
        (result, value, key) => {
          if (value !== result[key]) {
            result = getMutateSafeObject(state[addonId].attributes, result);
            result[key] = value;
          }

          return result;
        },
        state[addonId].attributes
      );

      // Skip update if nothing has been changed. The reference will
      // match the original block if `reduce` had no changed values.
      if (updatedAttributes === state[addonId].attributes) {
        return state;
      }

      // Otherwise merge attributes into state
      let store = {
        ...state,
        [addonId]: {
          ...state[addonId],
          attributes: updatedAttributes,
        },
      };
      return store;
    }

    default:
      return state;
  }
};

export default builder;
