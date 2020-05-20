import React, { createContext } from 'react';
import {createHigherOrderComponent} from '../components/compose';

const { Consumer, Provider } = createContext();

export { Provider as StyleBlockContextProvider };

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