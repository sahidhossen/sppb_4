import React from 'react'; 
import classnames from 'classnames/bind';
import GridView from './components/GridView';
import AddonList from './components/AddonList';
import {withSelect, withDispatch} from 'store';
import {compose} from './components/compose';


class Canvas extends React.Component {
    constructor(){
        super(); 
        this.setBlockListRef = this.setBlockListRef.bind(this);
    }

    setBlockListRef( node ) {
        this.wrapperNode = node;
        // it depents on this.wrapperNode but we can't keep this.wrapperNode in state
        // Because we need it to be immediately availeble for `focusableTabbable` to work.
        this.forceUpdate();
    }
    
    render() {
        let {attributes, mediaQuery, isAddonPicked} = this.props;
        let {
            gridGap,
            gridCol
        } = attributes; 

        let style = {
            '--gw': `${mediaQuery.value}px`,
            '--gg': gridGap,
            '--gc': gridCol,
            '--gr': 'auto',
            '--x': 'auto',
            '--y': 'auto',
            '--w': 'auto',
            '--h': 'auto'
        }

        const className = classnames({'sppb-builder-wrapper': true,'basegrid': true, 'cursor-draggable': isAddonPicked})

        return ( 
            <div style={style} className={className} ref={this.setBlockListRef}> 
                <GridView container={this.wrapperNode}>
                    <AddonList/>
                </GridView>
            </div>
        )
    }
}

export default compose(
    withSelect( select => {
        const {getAddon, getActiveMediaQuery, isAddonPicked} = select(); 
        const {attributes} = getAddon('root');
        
        return {
            mediaQuery: getActiveMediaQuery(),
            attributes,
            isAddonPicked: isAddonPicked()
        }
    })
)(Canvas);