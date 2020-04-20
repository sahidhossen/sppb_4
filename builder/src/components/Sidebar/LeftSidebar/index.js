import React from 'react';
import { NavigatorDocker, NavigatorSettings} from '../SidebarDocker';
import SidebarHeader from '../SidebarHeader';

class LeftSidebar extends React.Component {
	render(){
		return (
			<div className="sppb-left-sidebar sppb-sidebar">
				<SidebarHeader
                    className={'left-sidebar-header'}
				>
					<div className="sppb-top-alignment">
						<span className="sppb-top-alignment-icon">
							<i className="fas fa-columns"></i>
							<i className="fas fa-columns"></i>
							<i className="fas fa-columns"></i>
						</span>
						<span className="sppb-top-collaps-icon">
							<i className="fas fa-angle-double-left"></i>
						</span>
					</div>
                </SidebarHeader> 

				<NavigatorSettings/>
				<NavigatorDocker.Slot/>
			</div>
		)
	}
}

export default LeftSidebar