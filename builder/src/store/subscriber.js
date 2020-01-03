const select = (state) => {

}

export const subscribe = (store) => {
    let lastState = store.getState();
    const checkChanges = () => {
        const currentState = store.getState();
        const hasChanges = lastState !== currentState
        lastState = currentState;
        if (hasChanges) {
            console.log("changed", currentState)
        }
    }

    store.subscribe(checkChanges);
}   