import initialState from "./initialState";
import { revisedRandId } from "../lib/utils";
import deepcopy from "deepcopy";

const builder = ( state = initialState, action ) => {
    switch( action.type ){
        case 'ADD_BLOCK':
        
            const { builder, blocklist } = state
            let { payload: {index, parentId, blockName } } = action

            /**
             * Get static block by block name
             * Update parent children attribute
             * Add block to the state
             * */

            // N:B- Add prefix from global variable
            blockName = `sppb_${blockName.toLowerCase()}`;
            let newBlock = generateBlock(blocklist, blockName);
            builder[newBlock.id] = newBlock;
            builder[parentId].childrens.splice(index, 0, newBlock.id);

            return {
                ...state,
                builder: {...builder}
            }

        case 'ADD_SECTION':
            return {
                ...state,
                sections: action.payload
            };
            
        case 'REGISTER_ADDON_TYPES': {
            const { settings } = action;
            const {blocklist:_blocklist} = state
            const blockName = `sppb_${settings.name.toLowerCase()}`
            if ( typeof _blocklist[blockName] === 'undefined') {
                _blocklist[blockName] = settings;
            }
            return {
                ...state,
                blocklist: {..._blocklist}
            };
        }
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
