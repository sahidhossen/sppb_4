
import {subscribe, dispatch} from "../store";
export const RegisterAddon = (addonOn) => {
    dispatch({ type: 'REGISTER_ADDON_TYPES', settings: {...addonOn} })
}

subscribe( (store) => {
    console.log("changed", store)
})