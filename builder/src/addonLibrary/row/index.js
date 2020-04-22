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
        gridGap: '5px',
        gridCol: 10
    },
    childrens: [],
    droppable: true,
    accept: '*',
    Component: Row
}