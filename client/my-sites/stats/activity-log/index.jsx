/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import HeaderCake from 'components/header-cake';
import Main from 'components/main';
import { getSelectedSiteId } from 'state/ui/selectors';
import { getSiteSlug } from 'state/sites/selectors';

const ActivityLog = React.createClass( {

	componentDidMount() {
		window.scrollTo( 0, 0 );
	},

	render() {
		const { translate } = this.props;
		return (
			<Main wideLayout={ true }>
				<div id="my-stats-content">
					<HeaderCake onClick={ this.goBack }>
						{ translate( 'Activity Log' ) }
					</HeaderCake>
				</div>
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
