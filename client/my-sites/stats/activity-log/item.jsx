/**
 * External dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';
/**
 * Internal dependencies
 */
import Card from 'components/card/compact';
import Button from 'components/button';
import Gridicon from 'components/gridicon';
import Gravatar from 'components/gravatar';

const ActivityLogItem = React.createClass( {

	getIcon() {
		const {
			icon,
		} = this.props;

		return (
			<div className="activity-item__icons">
				<div className="activity-item__icon">
					<Gridicon icon={ icon || 'info-outline' } size={ 18 } />
				</div>
			</div>
		);
	},

	getActor() {
		const {
			user,
		} = this.props;

		return (
			<div className="activity-item__actor">
				<Gravatar user={ user } size={ 18 } />
				<div className="activity-item__actor-role">Vistor</div>
			</div>
		);
	},

	getContent() {
		const {
		} = this.props;

		return (
			<div className="activity-item__content">
				<div className="activity-item__content-main">Tread found in Plugin</div>
				<div className="activity-item__content-sub">Melware code detected...</div>
			</div>
		);
	},

	getAction() {
		const {
		} = this.props;

		return (
			<div className="activity-item__action">
				<Button>Do Stuff</Button>
			</div>
		);
	},

	render() {
		const classes = 'activity-item';

		return (
			<div className={ classes } >
				{ this.getIcon() }
				<Card>
					{ this.getActor() }
					{ this.getContent() }
					{ this.getAction() }
				</Card>
			</div>
		);
	}
} );

export default localize( ActivityLogItem );
