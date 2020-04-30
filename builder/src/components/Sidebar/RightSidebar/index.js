import React from 'react';
import ReusableComponent from './ReusableComponent';
import StyleComponents from './StyleComponents';

class RightSidebar extends React.Component {
	render(){
		return (
			<div className="sppb-right-sidebar sppb-sidebar">
				<ReusableComponent/>
               	<StyleComponents/>
			</div>
		)
	}
}

export default RightSidebar