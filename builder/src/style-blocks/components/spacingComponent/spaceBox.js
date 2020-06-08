import React from 'react'; 
import classnames from 'classnames'; 

export default class SpaceBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isDragStart: false,
            x: 0,
            y: 0
        }
    }

    componentDidMount(){
        let _window = window.frames["sppb-editor-view"].document;
        this.toggleListeners(_window);
        this.toggleListeners(window);
    }

    componentWillUnmount() {
        let _window = window.frames["sppb-editor-view"].document;
        this.toggleListeners(_window, false);
        this.toggleListeners(window, false);
    }

    toggleListeners(node, shouldListnerToEvents = true) {
        const method = shouldListnerToEvents
          ? "addEventListener"
          : "removeEventListener";
    
        node[method]("mousemove", this.onDragOverAction.bind(this));
        node[method]("mouseup", this.onDragStopAction.bind(this));
    
    }

    onDragOverAction(event) {
        let { x, y, isDragStart } = this.state;

        if (!isDragStart) 
            return; 
        
        let { value, direction, action, onDragChange } = this.props; 

        let nextValue = value === null ? 0 : parseInt(value); 

        if (direction === 'VL' || direction === 'VR') {
            let dx = direction === 'VL' ? (x-event.screenX) : (event.screenX-x)
            nextValue = nextValue + dx;
            if (action === 'padding') nextValue = Math.abs(nextValue);
        }
        if (direction === 'HT' || direction === 'HB') {
            let dy = direction === 'HB' ? (event.screenY - y) : (y - event.screenY)
            nextValue = nextValue + dy;
            if (action === 'padding') nextValue = Math.abs(nextValue);
        }

        onDragChange(nextValue);

        this.setState({
            x: event.screenX,
            y: event.screenY
        })
    }

    onDragStopAction(event) {
        event.preventDefault();
        this.setState({ isDragStart: false, x: 0 , y: 0 })
    }

    onMouseDownAction(event) {
        event.preventDefault();
        this.setState({
            isDragStart: true,
            x: event.screenX,
            y: event.screenY
        })
    }

    render(){
        let { className } = this.props;
        let classNames = classnames( className );
        return ( 
            <div 
                className={classNames}
                onMouseDown={this.onMouseDownAction.bind(this)}
            >
                {this.props.children}
            </div>
        )
    }
}