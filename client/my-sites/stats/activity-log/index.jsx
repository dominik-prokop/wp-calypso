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
import QueryActivityLog from 'components/data/query-activity-log';
import { getActivityLog, isFetchingActivityLog } from 'state/activity-log/selectors';


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
		const logs = this.props.activityLog.data;

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
				<QueryActivityLog siteId={ site.ID } />
			</Main>
		);
	}
}

export default connect(
	( state ) => {
		const siteId = getSelectedSiteId( state );
		return {
			slug: getSiteSlug( state, siteId ),
			activityLog: getActivityLog( state, siteId ),
			fetchingLog: isFetchingActivityLog( state, siteId )
		};
	}
)( localize( ActivityLog ) );
