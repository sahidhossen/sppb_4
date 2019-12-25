import store from "../store";
export const AddonRegister = () => {
    // const dispatch = useDispatch(); 
    store.dispatch({ type: 'ADD_ADDON_TYPES', settings:{type:"element type"} })
}