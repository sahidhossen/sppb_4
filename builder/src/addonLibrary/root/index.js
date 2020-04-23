import Root from './root';

export default {
    id: 'root',
    name: 'root',
    title: 'Root',
    private: true,
    // childrens: ['079543af-25f4-ab9c-156a-8b66570bccfb'],
    childrens: [],
    droppable: true,
    attributes: {
        display: 'grid',
        width: '900px',
        gridGap: '3px',
        gridCol: 12,

    },
    accept: '*',
    Component: Root
}