
import { createSlotFill } from '../../slot-fill';

/**
 * Internal dependencies
 */
import { ifBlockEditSelected } from '../AddonEditContext';

const { Fill, Slot } = createSlotFill( 'AddonControls' );

const AddonControls = ifBlockEditSelected( Fill );

AddonControls.Slot = Slot;

export default AddonControls;
