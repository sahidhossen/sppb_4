import Root from './root';

export default {
    id: 'root',
    name: 'root',
    title: 'Root',
    private: true,
    childrens: [],
    droppable: true,
    attributes: {
        display: 'grid',
        width: '900px',
        gridGap: '1px',
        gridCol: 50,

    },
    accept: '*',
    Component: Root
}