import React from 'react';
import { withSelect, withDispatch } from "store";
import { compose } from "../compose";
import { createIndicator, removeIndicator } from "../../lib/addonHelper";

class WithDropArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHover: false,
            currentElement: null,
            counter: 0,
            hoverArea: null
        }
        this.onMouseClick = this.onMouseClick.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        // this.onMouseLeave = this.onMouseLeave.bind( this );
        this.onMouseMove = this.onMouseMove.bind( this );
        
        this.hoverArea = '';
    }
    componentWillUnmount() {
		if ( this.props.container ) {
			this.toggleListeners( this.props.container, false );
		}
	}

	componentDidMount() {
		if ( this.props.container ) {
			this.toggleListeners( this.props.container );
		}
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.container === this.props.container ) {
			return;
		}
		if ( prevProps.container ) {
			this.toggleListeners( prevProps.container, false );
		}
		if ( this.props.container ) {
			this.toggleListeners( this.props.container, true );
		}
	}

	toggleListeners( container, shouldListnerToEvents = true ) {
		const method = shouldListnerToEvents ? 'addEventListener' : 'removeEventListener';
        container[ method ]( 'click', this.onMouseClick );
        container[method]("mouseover", this.onMouseOver.bind(this, container));
        container[method]("mouseout", this.onMouseOut.bind(this, container));
        container[ method ]( 'mousemove', this.onMouseMove );
		// container[ method ]( 'mouseleave', this.onMouseLeave );
	}

	onMouseClick(event) {
        let { pickedAddon, addonId, index } = this.props;
        console.log("index: ", this.hoverArea)
        if (pickedAddon) {
            let settings = {
                parentId: addonId || "root",
                index: index || 0,
                defaultAddon: {
                        ...pickedAddon,
                        attributes: {
                        ...pickedAddon.attributes
                    }
                }
            };
            this.hoverArea = null;
            this.props.onInsertAddon(settings);
        } else {
            // Select addon
            if(addonId) {
                this.props.selectAddon(addonId)
            }
        }
        removeIndicator();
    }

    onMouseOver(node, event) {
        event.stopPropagation();

        if (this.state.currentElement) return;

        if (!node.contains(event.target)) return;
        
        if (this.state.isHover || this.props.isSelected) {
            return;
        }

        // Check if all condition satisfied
        this.setState({ currentElement: node, isHover: true });
    }

    onMouseOut(node, event) {
        event.stopPropagation();
        //Ex: this.index = null 
        if (!this.state.currentElement) return;
        
        if (this.state.currentElement)
            if (this.state.currentElement == node) {
            this.setState({ isHover: false, currentElement: null });
            return;
        }
    }


    isAllow() {
        let {addon:{accept}, pickedAddon:{name}} = this.props;
        if (!accept) return false;
        return accept === "*" || (Array.isArray(accept) && accept.includes(name));
    }

    onMouseMove(event) {
        const { isRTL, container, index, addonId, pickedAddon, addon} = this.props;
        
        if (!addonId || !pickedAddon) return;
        
		const hoverBoundingRect = container.getBoundingClientRect();
        
        const hoverMiddleY = hoverBoundingRect.top + hoverBoundingRect.height / 2;
        const hoverMiddleX = hoverBoundingRect.left + hoverBoundingRect.width / 2;
        const position = {
            inside: false,
            top: false,
            bottom: false,
            // right: false,
            // left:false,
            index: index || 0
          };

        let hoverArea = null;
        if(this.isAllow()) {
            console.log('allowed')
            if (
                event.clientY >= hoverBoundingRect.top - 5 &&
                event.clientY <= hoverBoundingRect.top + 5
            ) {
                position.top = true;
                position.index = index;
                hoverArea = 'top';
            } else if (
                event.clientY >= hoverBoundingRect.bottom - 5 &&
                event.clientY <= hoverBoundingRect.bottom + 5
            ) {
                position.bottom = true;
                hoverArea = 'bottom';
                position.index = index + 1;
            } else {
                position.inside = true;
                hoverArea = 'inside';
                position.index = 0;
            }
        } else {
            console.log("!allowed:")
            // // set right-left
            // if(event.clientX > hoverMiddleX && event.clientX <= hoverBoundingRect.right) {
            //     position.right = true;
            //     position.index = index + 1;
            //     hoverArea = 'right';
            // }
            // if(event.clientX <= hoverMiddleX && event.clientX >= hoverBoundingRect.left) {
            //     position.left = true;
            //     position.index = index - 1;
            //     hoverArea = 'left';
            // }
            
            // set top-bottom
            if (
                event.clientY <= hoverMiddleY &&
                event.clientY >= hoverBoundingRect.top
              ) {
                position.top = true;
                hoverArea = 'top';
                position.index = index;
              }
              if (
                event.clientY > hoverMiddleY &&
                event.clientY <= hoverBoundingRect.bottom
              ) {
                position.bottom = true;
                hoverArea = 'bottom';
                position.index = index + 1;
              }
        }
        if(hoverArea !== this.hoverArea) {
            console.log('index', index, position)
            createIndicator(hoverBoundingRect, hoverArea)
            this.hoverArea = hoverArea
        }
    }

    render() {
        let {children, addon, index} = this.props;
        let {isHover} = this.state
        return children({isHover});
    }
}


export default compose(
    withSelect((select, { addonId = "root" }) => {
      let { getAddon, getPickedAddon } = select();
  
      return {
        addon: getAddon(addonId),
        pickedAddon: getPickedAddon(),
      };
    }),
    withDispatch((dispatch) => {
      const { insertAddon } = dispatch();
  
      return {
        onInsertAddon(settings) {
          insertAddon(settings);
        },
        selectAddon(addonId) {
            selectAddon(addonId);
        },
      };
    })
  )(WithDropArea);
  