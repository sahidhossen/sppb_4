import React from 'react'; 
import classnames from 'classnames/bind';

class SidebarHeader extends React.Component {
    render(){
        const {className} = this.props;
        const _Classes = classnames('sppb-sidebar-header', className);
        return (
            <div className={_Classes}>
               {this.props.children}
            </div>
        )
    }
}

export default SidebarHeader;