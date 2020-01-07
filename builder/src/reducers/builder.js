import initialState from "./initialState";
import { revisedRandId } from "../lib/utils";
// import {select} from '../store';
import deepcopy from "deepcopy";

const builder = ( state = initialState, action ) => {
    switch( action.type ){
        case 'ADD_BLOCK':
            const { builder } = state
            let { payload: {index, parentId, blockName } } = action

            /**
             * Get static block by block name
             * Update parent children attribute
             * Add block to the state
             * */

            // N:B- Add prefix from global variable
            blockName = `sppb_${blockName.toLowerCase()}`;
            let newBlock = generateBlock(addonList, blockName);
            builder[newBlock.id] = newBlock;
            builder[parentId].childrens.splice(index, 0, newBlock.id);

            return {
                ...state,
                builder: {...builder}
            }

        case 'SET_ATTRIBUTE': {
          const { builder } = state;
          const { payload: { id }, payload:{ attr }} = action;
          builder[id].attributes = {...attr, ...{...builder[id].attributes}}
          return {
            ...state,
            builder: {...builder}
          };
        }

        case 'ADD_SECTION':
            return {
                ...state,
                sections: action.payload
            };
        default:
            return state;
    }
}

/**
 * Generate New block by requested block name from stored blocklist with new Revised Id
 * @param {Object} state Current state
 * @param {string} blockName
 * @param {Object} properties // Block properties
 * @param {object} attributes // Block attributes
 */
const generateBlock = (
  blocklist,
  blockName,
  properties = {},
  attributes = {}
) => {
  const block = deepcopy(blocklist[blockName]);
  return {
    ...block,
    id: revisedRandId(),
    ...properties,
    attributes: { ...block.attributes, ...attributes }
  };
};

export default builder;
