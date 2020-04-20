import {map} from 'lodash';
import { generateAddon, nextNodeId, insertAt } from "./addonHelper";
/**
 * 
 * @param {*} block 
 * @param {Array} template 
 */

export const generateAddonWithTemplate = (addons = {}, addonId, template) => {

    map( template, ([name, attributes, innerTemplate], index) => {

        let nextAddon = {
            ...generateAddon(name, attributes || {}),
            id: nextNodeId(),
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