import React from 'react';
import { Provider } from "react-redux";
import { store } from "store";

/**
 * Will customer more in future
 */
export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(...arguments)
    }
    render(){
        return (
            <Provider store={ store }>
                { this.props.children }
            </Provider>
        )
    }
}