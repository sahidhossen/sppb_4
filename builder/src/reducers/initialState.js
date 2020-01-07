import Heading from '../addonLibrary/heading/Heading';

const heading = {
    "079543af-25f4-ab9c-156a-8b66570bccfb": {
        id: "079543af-25f4-ab9c-156a-8b66570bccfb",
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
        Component: Heading
    }
}
const initialState = {
    builder: {
        root: {
            parent: null,
            childrens: ['079543af-25f4-ab9c-156a-8b66570bccfb']
        },
        ...heading
    }
}



export default initialState;
