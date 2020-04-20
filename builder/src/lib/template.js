import {map} from 'lodash';
import { getDefaultAddon } from "./addonHelper";
import {insertAt} from './array';
import {revisedRandId} from './utils';

/**
 * 
 * @param {*} block 
 * @param {Array} template 
 */

export const generateAddonWithTemplate = (addons = {}, addonId, template) => {

    map( template, ([name, attributes, innerTemplate], index) => {

        let nextAddon = {
            ...getDefaultAddon(name, attributes || {}),
            id: revisedRandId(),
            parentId: addonId
          };

        addons[nextAddon.id] = nextAddon;
        
        if (addons[addonId] ) {
            addons[addonId] = {...addons[addonId], childrens: insertAt(addons[addonId].childrens, nextAddon.id, index) } 
        }

        if (innerTemplate) {
            generateAddonWithTemplate(addons, nextAddon.id, innerTemplate)
        }
    })
    return addons;
}