import React from 'react'; 
import GridView from './components/GridView';
import AddonList from './components/AddonList';

class Canvas extends React.Component {
    constructor(){
        super(); 
        this.setBlockListRef = this.setBlockListRef.bind(this);
    }

    setBlockListRef( node ) {
        this.wrapperNode = node;
        // We need to rerender to trigger a rerendering of HoverArea
        // it depents on this.wrapperNode but we can't keep this.wrapperNode in state
        // Because we need it to be immediately availeble for `focusableTabbable` to work.
        this.forceUpdate();
    }
    
    render() {
        let style = {
            '--gw': '900px',
            '--gg': '10px',
            '--gc': 12,
            '--gr': 'auto',
            '--x': 'auto',
            '--y': 'auto',
            '--w': 'auto',
            '--h': 'auto'
        }

        return ( 
            <div style={style} className="sppb-builder-wrapper basegrid" ref={this.setBlockListRef}> 
                <GridView container={this.wrapperNode}>
                    <AddonList/>
                </GridView>
            </div>
        )
    }
}

export default Canvas;