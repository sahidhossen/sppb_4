import {RegisterAddon} from '../registerHoc';
/**
 * Internal dependencies
 */
import * as paragraph from './paragraph';
import * as heading from './heading';
import * as row from './row';
import * as column from './column';


/**
 * Function to register an individual addon.
 *
 * @param {Object} addon The addon to be registered.
 *
 */
const registerEachAddon = ( addon ) => {
	if ( ! addon ) {
		return;
    }
	RegisterAddon( addon.default );
};


export const registerCoreAddons = () => {
	[
		// Common addons are grouped at the top to prioritize their display
        paragraph,
        heading,
        row,
        column
	].forEach( registerEachAddon );
};