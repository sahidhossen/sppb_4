import React from "react"
import {compose} from '../../compose'; 
import {withSelect, withDispatch} from 'store'; 



class AddonLibraries extends React.Component {
    render() {
        return <h1>Library</h1>
    }
}


export default compose([ 
    withSelect( select => {
        let {getMediaQueries, getActiveMediaQuery, getDefaultAddonList} = select();
        let addonListCategory = {
            recent: {}, 
            addon: {}
        }
        return {
            addonListCategory,
            addonList: getDefaultAddonList(),
            viewports: getMediaQueries(),
            viewport: getActiveMediaQuery()
        }
    }), 
    withDispatch( dispatch => {
        let {updateViewport} = dispatch();
        return {
            updateViewport(viewportName) {
                updateViewport(viewportName)
            }
        }
    })
])(AddonLibraries);