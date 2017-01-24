/**
 * External dependencies
 */
import React, { Component } from 'react';
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

class ActivityLog extends Component {

	componentDidMount() {
		window.scrollTo( 0, 0 );
	}

	update_logs( log ) {
		const { translate } = this.props;
		switch ( log.type ) {
			// Scans
			case 'security_threat_found':
				log.subTitle = translate( 'Security Threat Found!' );
				log.icon = 'notice';
				log.actionText = translate( 'Fix it' );
			// Backups
			case 'site_backed_up':
				log.subTitle = translate( 'Site Backed up' );
				log.icon = 'checkmark';
				log.status = 'is-success';
				log.actionText = 'Restore';
				break;
			// Backups
			case 'site_backed_up_failed':
				log.subTitle = translate( 'Site Backed up' );
				log.icon = 'notice';
				log.actionText = 'Fix';
				log.status = 'is-error';
				break;
			// Plugins
			case 'plugin_activated':
				log.subTitle = translate( 'Plugin Activated' );
				log.icon = 'plugins';
				log.actionText = 'Deactiavte';
				break;
			case 'plugin_deactivated':
				log.subTitle = translate( 'Plugin Deactivated' );
				log.icon = 'plugins';
				log.actionText = 'Actiavte';
				break;
			case 'plugin_needs_update':
				log.subTitle = translate( 'Plugin Update Available' );
				log.icon = 'plugins';
				log.status = 'is-warning';
				log.actionText = 'Update';
				break;
			case 'plugin_updated':
				log.subTitle = translate( 'Plugin Updated' );
				log.icon = 'plugins';
				log.actionText = 'Revert';
				break;

			// Themes
			case 'theme_switched':
				log.subTitle = translate( 'Theme Activated' );
				log.icon = 'themes';
				log.actionText = 'Revert';
				break;
			case 'theme_updated':
				log.subTitle = translate( 'Theme Updated' );
				log.icon = 'themes';
				log.actionText = 'Revert';
				break;
			// Plans
			case 'plan_updated':
				log.subTitle = translate( 'Plan' );
				log.icon = 'clipboard';
				log.actionText = 'Cancel';
				break;
			case 'plan_renewed':
				log.subTitle = translate( 'Plan Renewed' );
				log.icon = 'clipboard';
				break;
			// Jetpack Modules
			case 'activate_jetpack_feature':
				log.subTitle = translate( 'Jetpack' );
				log.icon = 'cog';
				log.actionText = 'Deactivate';
				break;
			case 'deactivate_jetpack_feature':
				log.subTitle = translate( 'Jetpack' );
				log.icon = 'cog';
				log.actionText = 'Activate';
				break;
		}

		return log;
	}

	render() {
		const { site } = this.props;

		const logs = [
			{
				title: 'Site has backed up',
				user: null,
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'Site has backed up Failed',
				user: null,
				type: 'site_backed_up_failed',
				timestamp: 1485220539222
			},
			{
				title: 'Akismet activated',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plugin_activated',
				timestamp: 1485220539222
			},
			{
				title: 'Akismet deactivated',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plugin_deactivated',
				timestamp: 1485220539222
			},
			{
				title: 'Jetpack version 4.6 is available',
				user: null,
				type: 'plugin_needs_update',
				timestamp: 1485220539222
			},
			{
				title: 'Akismet updated to version 3.2',
				user: null,
				type: 'plugin_updated',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'theme_switched',
				timestamp: 1485220539222
			},
			{
				title: 'Twenty Sixteen updated to version 1.0.1',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'theme_updated',
				timestamp: 1485220539222
			},
			{
				title: 'Site updated to Professional Plan, Thank you',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plan_updated',
				timestamp: 1485220539222
			},
			{
				title: 'Professional Plan Renewed for another month',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'plan_renewed',
				timestamp: 1485220539222
			},
			{
				title: 'Photon was activated',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'activate_jetpack_feature',
				timestamp: 1485220539222
			},
			{
				title: 'Custom CSS was deactivated',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'deactivate_jetpack_feature',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'site_backed_up',
				timestamp: 1485220539222
			},
			{
				title: 'This is some really cool post',
				user: { ID: 123, name: 'Jane A', role: 'Admin' },
				type: 'site_backed_up',
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

		const logsGroupsedByDate = map( groupBy( logs.map( this.update_logs, this ), ( log ) => new Date( log.timestamp ).toDateString() ), ( logs, timestamp ) => {
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
}

export default connect( ( state ) => {
	const siteId = getSelectedSiteId( state );
	return {
		slug: getSiteSlug( state, siteId )
	};
} )( localize( ActivityLog ) );
