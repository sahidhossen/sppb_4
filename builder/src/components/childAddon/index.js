import React from 'react';
import {pick} from 'lodash';
import {withSelect, withDispatch} from 'store';
import AddonList from '../AddonList';
import {compose} from '../compose';
import {withBlockEditContext} from '../AddonEditContext';
import {generateAddonWithTemplate} from '../../lib/template';
import GridView from '../GridView';

const withChildren = (settings ={} ) => {

    class ChildAddon extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            let {addon} = this.props; 
            // Check it doesn't have any children addon
            if (addon.childrens && addon.childrens.length === 0) {
                this.generateAddonWithTemplate();
            }
        }

        generateAddonWithTemplate(){
            let { settings:{template}, addon, insertAddons, addonId } = this.props;
            if (template && template.length) {
                const nextAddons = generateAddonWithTemplate( {[addonId]: addon }, addonId, template)
                insertAddons(nextAddons)
            }
        }

        render() {
            const {addonId, settings:{ref}, index, isGridview } = this.props;
            return (
                isGridview ?
                    <GridView  
                        addonId={addonId}
                        index={index}
                        container={ref}
                    >
                        <AddonList parentId={addonId}/>
                    </GridView>
                :
                <AddonList parentId={addonId}/>
            )
        }
    }

    ChildAddon = compose(
        withBlockEditContext( ( context ) => pick( context, [ 'addonId' ] ) ),
        withSelect((select, {addonId}) => {
            let { getAddon } = select();
            return {
                addon: getAddon(addonId)
            }
        }),
        withDispatch( dispatch => {
            let {addAddons} = dispatch(); 
            return {
                insertAddons(addons) {
                    addAddons(addons)
                }
            }
        })
    )(ChildAddon);

    return <ChildAddon settings={settings}/>
}

export default withChildren;