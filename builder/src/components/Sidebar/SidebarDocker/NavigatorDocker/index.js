import React from 'react'; 
import { withSelect } from 'store';
import { createSlotFill } from '../../../../slot-fill';
import withFocusComponent from '../../../../lib/withFocusComponent'
import { ifRenderComponent, compose } from '../../../compose';

const { Fill, Slot } = createSlotFill( 'NavigatorDocker' );

/**
 * Renders a sidebar with its content.
 *
 * @return {Object} The rendered sidebar.
 */
const NavigatorDocker = ( { children, label } ) => {
	return (
		<Fill>
			<div
				className="sppb-docker sppb-navigator-docker"
				role="region"
				aria-label={ label }
				tabIndex="-1"
			>
				{ children }
			</div>
		</Fill>
	);
};

const WrappedSidebar = compose(
	withSelect( ( select, { name } ) => {
		const {getActiveDockerName} = select();
		const activeName = getActiveDockerName('navigator');
		return {
			isActive: activeName === name
		}
	}),
	ifRenderComponent( ( { isActive } ) => isActive ),
	withFocusComponent,
)( NavigatorDocker );

WrappedSidebar.Slot = Slot;

export default WrappedSidebar;
