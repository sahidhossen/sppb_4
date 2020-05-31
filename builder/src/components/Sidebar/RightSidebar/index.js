import React from 'react';
import ReusableComponent from './ReusableComponent';
import StyleComponentDocker from './StyleComponentDocker';

class RightSidebar extends React.Component {
	render(){
		return (
			<div className="sppb-right-sidebar sppb-sidebar">
				<ReusableComponent/>
               	<StyleComponentDocker/>
			</div>
		)
	}
}

export default RightSidebar