// import Heading from '../addonLibrary/heading/Heading';

const data = {
    "079543af-25f4-ab9c-156a-8b66570bccfb": {
        id: "079543af-25f4-ab9c-156a-8b66570bccfb",
        name: 'row',
        accept: "*",
        childrens: ['2883dcd5-4461-c446-2d28-5e3c68956845','f0d23cca-fd1e-7304-96f6-f8746ab4cbd5'],
        attributes: {
            class:'sppb-row',
            color: 'red',
            display: "grid",
            _addonWidth: 719.4000000000001,
            gridGap: "2px",
            gridCol: 15,
            gridArea: "1 / 2 / 4 / 14",
            _addonHeight: 177.60000000000002
        },
        content: '',
        parentId: 'root'
    },
    "2883dcd5-4461-c446-2d28-5e3c68956845": {
        id: "2883dcd5-4461-c446-2d28-5e3c68956845",
        name: "Heading",
        accept: "*",
        childrens: [],
        attributes: {
            class: "sppb-heading",
            color: "red",
            displayType: "grid",
            gridArea: "2 / 2 / 4 / 9",
            _addonWidth: 334.58333333333337,
            _addonHeight: 94.16666666666667
        },
        content: '',
        parentId: '079543af-25f4-ab9c-156a-8b66570bccfb'
    },
    "f0d23cca-fd1e-7304-96f6-f8746ab4cbd5": {
        id: "f0d23cca-fd1e-7304-96f6-f8746ab4cbd5",
        name: "Heading",
        accept: "*",
        childrens: [],
        attributes: {
            class: "sppb-heading",
            color: "red",
            displayType: "grid",
            gridArea: "2 / 9 / 4 / 16",
            _addonWidth: 334.58333333333337,
            _addonHeight: 94.16666666666667
        },
        content: '',
        parentId: '079543af-25f4-ab9c-156a-8b66570bccfb'
    }
}

import Root from '../addonLibrary/root';

const initialState = {
    root: {...Root},
    ...data
}



export default initialState;
