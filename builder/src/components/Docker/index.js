import React, { Fragment } from 'react';
import {RightSidebar, LeftSidebar} from '../Sidebar';
import TopBar from '../TopBar';

class Docker extends React.Component {
    render(){
        return (
           <Fragment>
                <TopBar/>
                <LeftSidebar/>
                <RightSidebar/>
           </Fragment>
        )
    }
}

export default Docker;