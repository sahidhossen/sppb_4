import React from 'react';
import { flowRight } from 'lodash';

import createHigherOrderComponent from './createHightOrderComponent';

export { 
    createHigherOrderComponent,
    flowRight as compose 
};

/**
 * Higher-order component creator, creating a new component which renders if
 * the given condition is satisfied or with the given optional prop name.
 *
 * @param {Function} predicate Function to test condition.
 *
 * @return {Function} Higher-order component.
 */
export const ifRenderComponent = ( predicate ) => createHigherOrderComponent(
	( WrappedComponent ) => ( props ) => {
		if ( ! predicate( props ) ) {
			return null;
		}

		return <WrappedComponent { ...props } />;
	},
	'ifRenderComponent'
);
