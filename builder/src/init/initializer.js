import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {SppbEditor} from './SppbEditor';
import {registerCoreAddons} from '../addonLibrary';


export function Initialize (target, settings={} ) {
    
    unmountComponentAtNode(target);

    registerCoreAddons();

    render(
        <SppbEditor
            settings={settings}
        />,
        target 
    )
}