import initialState from "./initialState";
import {insertAt, moveTo} from '../lib/array';
import {reduce, pullAt, castArray} from 'lodash';

const getMutateSafeObject = (original, working) => {
  if ( original === working ){
    return {...original};
  }
  return working;
}

const builder = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BLOCK":
      // const {builder} = state;
      const {
        defaultAddon,
        payload: { index, parentId }
      } = action;
      /**
       * Set default block with unique ID
       * Update parentId associated with the new Addon
       * Update parent Addon children array with currect index and new addonId
       * */

      state[defaultAddon.id] = defaultAddon;
      state[defaultAddon.id].parentId = parentId; // Add parent Id
      let parentAddon = {...state[parentId]};
      let childrens = [...parentAddon.childrens];
      childrens.splice(index, 0, defaultAddon.id)
      parentAddon = {...parentAddon, childrens:[...childrens]}
      state[parentId] = {...parentAddon};
      // state[parentId].childrens.splice(index, 0, defaultAddon.id);
      // console.log("parent: ", state)
      return state;
    case "TRANSFER_BLOCK": {
      /**
       * Index: drop index
       * AddonId: source AddonId
       * parentId: Target addonId 
       */
      const {payload:{index, addonId, parentId}} = action;
      
      /**
       * sourceAddon: Find parentId addon from source addon
       * Remove addonId from sourceParent children array
       * 
       * Update SourceParent Childrens
       * Update destination children array with currect index and current addonId
       */
      const sourceAddon = state[addonId];

      const sourceParent = state[sourceAddon.parentId];
      const sourceAddonIndex = sourceParent.childrens.indexOf(addonId);
      // If source ParentId and target parentId not same then Do rest of the stuff
      if (sourceAddon.parentId !== parentId) { 
        const childrens = [...sourceParent.childrens];
        pullAt(childrens, [sourceAddonIndex])

        sourceParent.childrens = childrens;
        state[sourceParent.id] = {...sourceParent }
        state[addonId] = {...sourceAddon, parentId};
        console.log("insert & remove")
        // Insert into new addon
        state[parentId].childrens = insertAt(state[parentId].childrens, addonId, index );
      } else {
        // Move index position
        console.log("move")
        state[parentId].childrens = moveTo(state[parentId].childrens, sourceAddonIndex, index);
      }
      
      return state;

    };

    case "SET_ATTRIBUTE": {
      const { addonId, attributes } = action;
      // Ignore updates if block isn't known
        if ( ! state[ addonId ] ) {
          return state;
        }
      // Consider as updates only changed values
        const updatedAttributes = reduce( attributes, ( result, value, key ) => {
          if ( value !== result[ key ] ) {
            result = getMutateSafeObject( state[ addonId ].attributes, result );
            result[ key ] = value;
          }

          return result;
        }, state[ addonId ].attributes );

        // Skip update if nothing has been changed. The reference will
        // match the original block if `reduce` had no changed values.
        if ( updatedAttributes === state[ addonId ].attributes ) {
          return state;
        }

        // Otherwise merge attributes into state
        let store = {
          ...state,
          [ addonId ]: {
            ...state[ addonId ],
            attributes: updatedAttributes,
          },
        };
        return store;
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
