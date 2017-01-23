/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';
/**
 * Internal dependencies
 */
import FoldableCard from 'components/foldable-card';
import ActivityLogItem from '../activity-log/item';

const ActivityLogDate = React.createClass( {

    render() {
        return (
            <FoldableCard
                header={ 'Jan 1, 1999' }
            >
                <ActivityLogItem />
                <ActivityLogItem />
                <ActivityLogItem />
            </FoldableCard>
        );
    }
} );

export default localize( ActivityLogDate );
