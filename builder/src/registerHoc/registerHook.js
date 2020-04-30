
import {isFunction} from 'lodash';
import {subscribe, dispatch} from "store";
import {revisedRandId, isValidIcon} from '../lib/utils';
import {registerAddon} from '../actions';
// import { SPPBStore } from "../SPPBStore";
/**
 * Check all depedency
 * @param {OBject} addonOn Addon settings with component
 */
export const RegisterAddon = (settings) => {
    /**
     * Check if the name is unique
     */
    if ('name' in settings && typeof settings.name !== 'string') {
        console.error('Addon "name" must be string!');
        return;
    }
     /**
     * Check if the category name is unique
     */
    if ('category' in settings && typeof settings.category !== 'string') {
        console.error('Addon "category" must be string!');
        return;
    }
    /**
     * Check the component is actual react component
     */
    if ('Component' in settings && !isFunction(settings.Component)) {
        console.error('The "Component" property must be a valid react component!');
        return;
    }

    /**
     * Check if the icon is valid
     */
    if ( 'icon' in settings && !isValidIcon(settings.icon)) {
        console.error('The "icon" passed are invalid. You have to provide a string, an element, a function or an object that satisfied with react component!')
    }

    /**
     * Add dfault style settings
     */

    /**
     * Generate an unique id
     */
    settings.id = revisedRandId();

    dispatch(registerAddon(settings));
}

subscribe( (store) => {
    // console.log("changed", store)
})