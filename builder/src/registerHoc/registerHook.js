import store from "../store";
export const RegisterAddon = (addonOn) => {
    // const dispatch = useDispatch(); 
    // Check all depedencies for each addon

    store.dispatch({ type: 'REGISTER_ADDON_TYPES', settings: {...addonOn} })
}