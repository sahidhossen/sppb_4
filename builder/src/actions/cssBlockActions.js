
export const setComputeStyle = (data) => {
    return {type: "SET_COMPUTED_STYLE", payload: data }
}

export const updateComputedStyle = ( attributes, options={} ) => {
    // let getComputeStyle = {backgroundColor: {local:{value: 'rgba(0,0,0,1)'}}}

    // set local keywork between name and value;

    return {type: "SET_COMPUTED_ATTRIBUTE", payload: {attributes, options} }
}