import React, { Fragment } from 'react'; 
import {compose} from '../../compose'; 
import {withSelect, withDispatch} from 'store'; 
import ViewportList from './ViewportList';
import SppbPortal from '../../sppbportal/SppbPortal';

class Viewport extends React.Component {
    constructor(){
        super()
        this.state = {
            isList: false,
            event: null
        }
    }
    openViewportList(event){
        event.persist()
        this.setState({ isList: true, event})
    }
    reset() {
        this.setState({ isList: false, event:null })
    }
    updateViewport(viewport) {
        this.props.updateViewport(viewport);
    }
    render() {
        let {viewport,viewports} = this.props;
        return (
            <Fragment>
                <div className="sppb-responsive-btn" ref={ref => { this.button = ref }} onClick={this.openViewportList.bind(this)}>
                    <i className={viewport.icon}></i>
                    <span>Responsive</span>
                </div>
            {this.state.isList && 
                <SppbPortal className="popover">
                    <ViewportList
                        reset={this.reset.bind(this)}
                        event={this.state.event}
                        target={this.button}
                        update={this.props.updateViewport}
                        viewports={this.props.viewports}
                    />
                </SppbPortal>
            }
            </Fragment>
        )
    }
}

export default compose([ 
    withSelect( select => {
        let {getMediaQueries, getActiveMediaQuery} = select();
        return {
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
])(Viewport);