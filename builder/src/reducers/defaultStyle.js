const styleState = {
    backgrounds: {
        backgroundColor: {
            type: 'color', 
            value: 'rgba(0,0,0,0)' 
        },
        backgrounds: {
            type: 'array', 
            value: []
        }
    },

    borders: {
        border: {
            color: { type: 'color', value: 'rgba(0,0,0,0)' },
            width: { unit: 'px', value: '0' },
            style: { value: 'none' }
        },
        borderLeft: {
            color: { type: 'color', value: 'rgba(0,0,0,0)' },
            width: { unit: 'px', value: '0' },
            style: { value: 'none' }
        },
        borderRight: {
            color: { type: 'color', value: 'rgba(0,0,0,0)' },
            width: { unit: 'px', value: '0' },
            style: { value: 'none' }
        },
        borderBottom: {
            color: { type: 'color', value: 'rgba(0,0,0,0)' },
            width: { unit: 'px', value: '0' },
            style: { value: 'none' }
        },
        borderLeft: {
            color: { type: 'color', value: 'rgba(0,0,0,0)' },
            width: { unit: 'px', value: '0' },
            style: { value: 'none' }
        },
        borderRadius: { unit: 'px', value:'0' },
        borderRadiusBottomLeft: { unit: 'px', value:'0' },
        borderRadiusBottomRight: { unit: 'px', value:'0' },
        borderRadiusTopLeft: { unit: 'px', value:'0' },
        borderRadiusTopRight: { unit: 'px', value:'0' },
    }, 

    
}


/**
 * ==========
 * BACKGROUND TYPES
 * ==========
 * type: 
 *  1. linear-gradient-background, 
 *  2. radial-gradient-background, 
 *  3. solid-color-background, 
 *  4. image-background
 */

let backgroundType = [
    {
        type: "linear-gradient-background",
        value: {
            angle: {
                unit: 'deg', 
                value: 180
            },
            hidden: false,
            colorStopList: [
                {
                    color: { type: 'color', value: ''},
                    position: { unit: '%', value: '0'}
                }
            ]
        }
    }
]