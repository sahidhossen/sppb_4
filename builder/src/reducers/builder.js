import initialState from './initialState';
import { revisedRandId } from '../lib/utils';
import deepcopy from 'deepcopy';

const builder = ( state = initialState, action ) => {
    switch( action.type ){
        case 'ADD_BLOCK':
        
            const { builder, blocklist } = state
            const { payload: {index, parentId, blockName } } = action

            /**
             * Get static block by block name
             * Update parent children attribute
             * Add block to the state
             * */  
            const newBuilder = deepcopy(builder);
            let newBlock = generateBlock(blocklist, blockName);
            newBuilder[newBlock.id] = newBlock
            if( blockName === 'row' ){
                for( let i=0; i<2; i++ ){
                    const column = generateBlock(blocklist, 'column')
                    newBlock.childrens.push(column.id)
                    newBuilder[column.id] = column;
                }
            }
            newBuilder[parentId].childrens.splice( index, 0, newBlock.id )

            return {
                ...state,
                builder: {...builder, ...newBuilder }
            };

        case 'ADD_SECTION':
            return {
                ...state,
                sections: action.payload
            };
        case 'ADD_ADDON_TYPES': {
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

const getStaticBlock = (blockList, blockName) => blockList[blockName];

const addRow = (builder, blockList, row, grid = 2 ) => {
    for( let i=0; i<2; i++ ){
        const column = generateBlock(blockList, 'column')
        row.childrens.push(column.id)
        builder[column.id] = column;
    }
}

/**
 * Generate New block by requested block name from stored blocklist with new Revised Id
 * @param {Object} state Current state
 * @param {string} blockName 
 * @param {Object} properties // Block properties
 * @param {object} attributes // Block attributes
 */
const generateBlock = (blocklist, blockName, properties = {}, attributes={} ) => {
    const block = deepcopy(blocklist[blockName])
    return {...block, id: revisedRandId(), ...properties, attributes: {...block.attributes, ...attributes} };
}

export default builder;