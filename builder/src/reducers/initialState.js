import { revisedRandId } from '../lib/utils';
import {addonList} from './addonList'
import Section from '../components/Section';

const serialBlockList = (addonLists) => {
    let _addonLists = {};
    for( const key in addonLists ){
        const list = addonLists[key].list
        for(let i = 0; i<list.length; i++){
            _addonLists[list[i].name] = list[i]
        }
    }
    return _addonLists
}


const initialState = {
    builder: {
        root: {
            parent: null,
            childrens: []
        }
    },
    blocklist: serialBlockList(addonList)
}



export default initialState;