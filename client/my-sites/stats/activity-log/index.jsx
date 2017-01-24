/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import { getSelectedSiteId } from 'state/ui/selectors';
import { getSiteSlug } from 'state/sites/selectors';
import StatsFirstView from '../stats-first-view';
import SidebarNavigation from 'my-sites/sidebar-navigation';
import StatsNavigation from '../stats-navigation';
import ActivityLogDate from '../activity-log-date';

const ActivityLog = React.createClass( {

	componentDidMount() {
		window.scrollTo( 0, 0 );
	},

	render() {
		const { site } = this.props;
		return (
			<Main wideLayout={ true }>
				<StatsFirstView />
				<SidebarNavigation />
				<StatsNavigation section="activity" site={ site } />
				<section className="activity-log__wrapper">
					<ActivityLogDate />
					<ActivityLogDate />
				</section>
			</Main>
		);
	}
} );

export default connect( ( state ) => {
	const siteId = getSelectedSiteId( state );
	return {
		slug: getSiteSlug( state, siteId )
	};
} )( localize( ActivityLog ) );
