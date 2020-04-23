import Row from './row';

export default {
    name: 'row',
    title: 'Row',
    icon: 'fa fa-square-o',
    category: 'grid',
    className: 'sppb-row',
    attributes: {
        display: 'grid',
        _addonWidth: 0,
        gridGap: '2px',
        gridCol: 15
    },
    childrens: [],
    droppable: true,
    accept: '*',
    Component: Row
}