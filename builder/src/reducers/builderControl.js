const builderControl = ( state = {tools: false }, action ) => {
    switch( action.type ){
        case 'TOOLS_ON':
            return{
                ...state,
                tools: true
            }
        default:
            return state;
    }
}

export default builderControl;