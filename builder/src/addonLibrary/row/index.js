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
        gridCol: 10
    },
    defaultAttributes: {
        backgroundColor: 'rgba(0,0,0,0)',
        border: {
            borderWidth: '1px', 
            borderColor: 'black',
            borderStyle: 'solid'
        }
      
    },
    childrens: [],
    droppable: true,
    accept: ['column'],
    Component: Row
}