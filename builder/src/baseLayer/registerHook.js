import store from "../store";
export const AddonRegister = (addonOn) => {
    // const dispatch = useDispatch(); 
    // Check all depedencies for each addon

    store.dispatch({ type: 'ADD_ADDON_TYPES', settings: {...addonOn} })
}