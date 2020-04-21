const initialControls = {
    tools: false,

    pickedAddon: null,
    mediaQuery:{
      active: 'desktop',
      scale: '100%',
      list: {
        large: {
          value: 1920,
          scale: 60.6,
          title: 'Large Device',
          icon: 'fa fa-desktop',
          details: 'Styles added here will apply at 1280px and up.'
        },
        desktop: {
          value: 900, //1164,
          scale: 100,
          title: 'Desktop',
          icon: 'fa fa-desktop',
          details: 'Styles added here will apply at 1170px and up.'
        },
        tablet: {
          value: 768,
          scale: 100,
          title: 'tablet',
          icon: 'fa fa-desktop',
          details: 'Styles added here will apply at 1170px and up.'
        },
        mobile: {
          value: 320,
          scale: 100,
          title: 'tablet',
          icon: 'fa fa-desktop',
          details: 'Styles added here will apply at 1170px and up.'
        },
      }
    },
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
        
        case "UPDATE_ACTIVE_MEDIA_QUERY": {

          const {payload:{name}} = action; 
          const {mediaQuery} = state; 

          if (!mediaQuery.list[name])
            return state;

          return {...state, mediaQuery: {mediaQuery, active: name }}

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