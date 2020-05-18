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

// class Menu extends React.Component {
// 	constructor() {
// 	  super()
// 	  this.state = {
// 		value: this.props.defaultValue,
// 		setValue: (newValue) => {
// 		  this.setState({ value: newValue })
// 		}
// 	  }
// 	}
// 	render() {
// 	  return (
// 		<MenuContext.Provider value={this.state}>
// 		  {/* other stuff */}
// 		</MenuContext.Provider>
// 	  )
// 	}
//   }