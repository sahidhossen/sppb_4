import React, { createContext } from 'react';
import {createHigherOrderComponent} from '../compose';

const { Consumer, Provider } = createContext( {
	name: '',
	isSelected: false,
	addonId: null,
} );

export { Provider as BlockEditContextProvider };

/**
 * A Higher Order Component used to inject BlockEdit context to the
 * wrapped component.
 *
 * @param {Function} mapContextToProps Function called on every context change,
 *                                     expected to return object of props to
 *                                     merge with the component's own props.
 *
 * @return {Component} Enhanced component with injected context as props.
 */
export const withBlockEditContext = ( mapContextToProps ) => createHigherOrderComponent( ( OriginalComponent ) => {
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
}, 'withBlockEditContext' );

/**
 * A Higher Order Component used to render conditionally the wrapped
 * component only when the BlockEdit has selected state set.
 *
 * @param {Component} OriginalComponent Component to wrap.
 *
 * @return {Component} Component which renders only when the AddonEdit is selected.
 */
export const ifBlockEditSelected = createHigherOrderComponent( ( OriginalComponent ) => {
	return ( props ) => {
        return (
            <Consumer>
                { ( { isSelected } ) => isSelected && (
                    <OriginalComponent { ...props } />
                ) }
            </Consumer>
        )
    }
}, 'ifBlockEditSelected' );
