import Heading from './heading';
import {revisedRandId} from '../../lib/utils';

export default {
    id: revisedRandId(),
    name: 'Heading',
    title: 'Heading',
    icon: 'fa fa-heading',
    category: 'common',
    childrens: [],
    attributes: {
        class:'sppb-heading',
        color: 'red',
    },
    content: '',
    childrens:[],
    Component: Heading
}