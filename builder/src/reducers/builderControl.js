const initialControls = {
    tools: false,
    navigator: {
      status: false
    },
    selector: {
      addonId: null,
      isMultiple: false
    },
    dockerPalet: {
      navigator: 'navigator', // Navigator, bookmark
      addon: 'all', // addon categoeis, /recent, all, layout
      design: 'style', // Style, settings, interaction
    },
    sidebar: {
      leftSidebar: {
        position: 'left',
        docker: 'out'
      }, // left, bottom, docker(in|out)
      rightSidebar: {
        position: 'left',
        docker: 'out'
      },
      topBar: {
        position: 'left',
        docker: 'out'
      }
    }
  };

const builderControl = ( state = initialControls, action ) => {
    switch( action.type ){
        case "TOGGLE_NAVIGATOR": { 
            const { payload } = action;
            return { ...state, navigator: { ...state.navigator, status: payload } };
            }
            
        case 'SELECT_ADDON': {
            const {payload} = action
            return {...state, selector: {...state.selector, addonId: payload.addonId }}
            }
        
        case 'SELECT_MULTIPLE_ADDON': {
            const {payload} = action
            return {...state, selector: {addonId: payload.addonId, isMultiple: true }}
            }
        
        case 'DESELECT_ADDON': {
            return {...state, selector: {addonId: null, isMultiple: false }}
            }
        
        case 'SET_SIDEBAR': {
            const {payload:{sidebarName = 'leftSidebar', settings }} = action
            return {...state, sidebar: {...store.sidebar, [sidebarName] : {...settings}} }
            }
        
        case 'SET_DOCKER': {
            const {payload:{dockerName, tabName }} = action
            return {...state, dockerPalet: {...state.dockerPalet, [dockerName] : tabName } }
            }
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