export const testIframe = () => {
    return { type: 'TEST_IFRAME'}
  };


/**
 * Add Section
 */
export const addSection = (sectionData) => {
    return {
        type: 'ADD_SECTION',
        payload: sectionData
    }
}

export const addBlock = (blockData) => {
    
}