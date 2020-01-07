import Row from './row';
import {revisedRandId} from '../../lib/utils';

export default {
    id: revisedRandId(),
    name: 'row',
    title: 'Row',
    icon: 'fa fa-square-o',
    category: 'grid',
    className: 'sppb-row',
    attributes: {},
    childrens: [],
    content: [],
    droppable: true,
    accept: '*',
    Component: Row
}