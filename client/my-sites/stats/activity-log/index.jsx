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
import ActivityLogItem from '../activity-log/item';
import SelectDropdown from 'components/select-dropdown';
import SelectDropdownItem from 'components/select-dropdown/item';

const ActivityLog = React.createClass( {

	componentDidMount() {
		window.scrollTo( 0, 0 );
	},

	render() {
		const { site, translate } = this.props;
		return (
			<Main wideLayout={ true }>
				<StatsFirstView />
				<SidebarNavigation />
				<StatsNavigation section="activity" site={ site } />
				<SelectDropdown selectedText={ translate( 'All Users' ) }>
					<SelectDropdownItem>Enej</SelectDropdownItem>
					<SelectDropdownItem>Jeff</SelectDropdownItem>
					<SelectDropdownItem>Filipe</SelectDropdownItem>
				</SelectDropdown>
				<SelectDropdown selectedText={ translate( 'All Contexts' ) } />
				<SelectDropdown selectedText={ translate( 'All Actions' ) } />
				<SelectDropdown selectedText={ translate( 'All Time' ) } />
				<ActivityLogItem />
				<ActivityLogItem />
				<ActivityLogItem />
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
