import React from 'react';
import AddonList from '../addonList';

const withChildren = (addonId) => {
    return () => <AddonList parentId={addonId}/>;
}

export default withChildren;