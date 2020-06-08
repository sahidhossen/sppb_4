import React, { createContext } from 'react';
import {mapValues} from 'lodash';
import {createHigherOrderComponent} from '../../components/compose';
import { styleContextReducer } from './reducer';
import * as actions from './actions';

const { Consumer, Provider } = createContext();


export class StyleBlockContextProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
      		value: "",
		}
		this.dispatch = this.dispatch.bind(this);
	}

	proxyDispatch(action) {
		this.setState((state) => styleContextReducer(state, action));
	}

	getActions(actions) {
		const createBoundAction = ( action ) => ( ...args ) => this.proxyDispatch( action( ...args ) );
		return mapValues( actions, createBoundAction );
	}

	dispatch() {
		return this.getActions(actions);
	}

	render() {
		return (
			<Provider
			value={{ state: this.state, dispatch: this.dispatch }}
		  >
				{this.props.children}
		  </Provider>
		)
	}
}


export const withStyleContext = ( mapContextToProps ) => createHigherOrderComponent( ( OriginalComponent ) => {
	return ( props ) => (
		<Consumer>
			{ ( context ) => (
				<OriginalComponent
					{ ...props }
					{ ...mapContextToProps( context, props ) }
				/>
			) }
		</Consumer>
	);
}, 'withStyleContext' );