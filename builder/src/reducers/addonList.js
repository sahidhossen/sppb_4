import { revisedRandId } from '../lib/utils';

import Row from '../addonLibrary/row';
import Column from '../addonLibrary/column';
 
export const addonList = {
    common: {
        title: 'Common Blocks',
        list: [
            {
                id: revisedRandId(),
                category: 'common',
                icon: 'fa fa-image',
                title: 'Image',
                name: 'sppb_image',
                type: 'image',
                className: 'sppb-image',
                attributes: {},
                content: ''
            },
            {
                id: revisedRandId(),
                title: 'List',
                category: 'common',
                icon: 'fa fa-list',
                name: 'sppb_list',
                type: 'list',
                className: 'sppb-title',
                attributes: {},
                content: ''
            },
            {
                id: revisedRandId(),
                category: 'common',
                icon: 'fa fa-content',
                title: 'Article',
                name: 'sppb_content',
                type: 'content',
                className: 'sppb-title',
                attributes: {},
                content: ''
            }
        ]
    },
    grid: {
        title: 'Grid Layout',
        list: [
            {
                id: revisedRandId(),
                name: 'row',
                title: 'Row',
                icon: 'fa fa-square-o',
                category: 'grid',
                className: 'sppb-row',
                attributes: {},
                childrens: [],
                content: [],
                Component: Row
            },
            {
                id: revisedRandId(),
                name: 'column',
                icon: 'fa fa-columns',
                title: 'Column',
                category: 'grid',
                grid: 12,
                childrens: [],
                attributes: {
                    class: 'sppb-column sppb-column-3',
                    width: '50%'
                },
                content:[],
                Component: Column
            }
        ]
    }
}


