/**
 * Reducers for addons list default data
 */

export default ( state = {}, action ) => {
    switch( action.type ){
        case 'REGISTER_ADDON_TYPES': {
            const { settings } = action;
            const _state = {...state}
            const blockName = `sppb_${settings.name.toLowerCase()}`
            if ( typeof _state[blockName] === 'undefined') {
                _state[blockName] = settings;
            }
            return {
                ..._state
            };
        }
        default: 
        return state
    }
}