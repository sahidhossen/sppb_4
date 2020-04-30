import React from 'react';
import SidebarHeader from '../SidebarHeader';
import AddonControls from '../../AddonControls';

class ReusableComponent extends React.Component {
    render(){
        return (
            <div className="sppb-docker-container sppb-reusable-component-docker">
                <SidebarHeader
                    className={'right-sidebar-header'}
                >
				<div className="sppb-top-alignment">
					<span className="sppb-top-collaps-icon">
						<i className="fas fa-angle-double-right"></i>
					</span>
					<span className="sppb-top-alignment-icon">
						<i className="fas fa-columns"></i>
						<i className="fas fa-columns"></i>
						<i className="fas fa-columns"></i>
					</span>
				</div>
                </SidebarHeader> 
                <div className="sppb-panel-body">
                    <AddonControls.Slot/>
                </div>
            </div>
        )
    }
}

export default ReusableComponent;