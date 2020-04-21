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
        gridGap: '1px',
        gridCol: 20
    },
    childrens: [],
    droppable: true,
    accept: '*',
    Component: Row
}