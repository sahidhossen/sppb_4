import React from 'react'; 

export default class Panel extends React.Component {
    render() {
        return (
            <div className="editor-x-panel">
                <div className="editor-x-panel-header">Panel Header</div>
                <div className="panel-x-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}