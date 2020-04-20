import React from 'react'; 
import { withSelect } from 'store';
import { createSlotFill } from '../../../../slot-fill';
import { ifRenderComponent, compose } from '../../../compose';

const { Fill, Slot } = createSlotFill( 'AddonEditControlsDocker' );

/**
 * Renders a sidebar with its content.
 *
 * @return {Object} The rendered sidebar.
 */
const AddonEditControlsDocker = ( { children, label } ) => {
	return (
		<Fill>
			<div
				className="sppb-docker sppb-addon-docker"
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
		const activeName = getActiveDockerName('design');
		return {
			isActive: activeName === name
		}
	}),
	ifRenderComponent( ( { isActive } ) => isActive ),
)( AddonEditControlsDocker );

WrappedSidebar.Slot = Slot;

export default WrappedSidebar;
