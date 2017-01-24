/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { groupBy, map } from 'lodash';

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
		const logs = [
			{
				title: 'This is some really cool post',
				subTitle: 'Deleted Post',
				icon: 'trash',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				actionText: 'Undo',
				timestamp: 1485220539222
			},
			{
				title: 'Jetpack updated to 4.5.1',
				subTitle: 'Plugin Update',
				icon: 'plugins',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				time: '4:32pm',
				actionText: 'Undo',
				timestamp: 1483351202400
			},
			{
				title: 'Jetpack updated to 4.5.1',
				subTitle: 'Plugin Activated',
				icon: 'plugins',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				time: '4:32pm',
				actionText: 'Undo',
				timestamp: 1483351202420
			},
			{
				title: 'Post Title',
				subTitle: 'Post Updated',
				icon: 'posts',
				user: { ID: 333, name: 'Jane A', role: 'Admin' },
				time: '10:55am',
				actionText: 'Undo',
				timestamp: 1483264820300
			}
		];

		const logsGroupsedByDate = map( groupBy( logs, ( log ) => new Date( log.timestamp ).toDateString() ), ( logs, timestamp ) => {
			return <ActivityLogDate logs={ logs } key= { "activity-log-" + timestamp } />;
		} );

		return (
			<Main wideLayout={ true }>
				<StatsFirstView />
				<SidebarNavigation />
				<StatsNavigation section="activity" site={ site } />
				<section className="activity-log__wrapper">
					{ logsGroupsedByDate }
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
