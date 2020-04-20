import React from 'react';
import SidebarHeader from '../SidebarHeader';
import {AddonEditControlDocker, AddonEditControlSettings} from '../SidebarDocker';

class RightSidebar extends React.Component {
	render(){
		return (
			<div className="sppb-right-sidebar sppb-sidebar">
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
                <AddonEditControlSettings/>
				<AddonEditControlDocker.Slot/>
			</div>
		)
	}
}

export default RightSidebar