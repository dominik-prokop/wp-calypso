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
	getTime() {
		const {
		} = this.props;

		return (
			<div className="activity-log-item__time">
				4:21pm
			</div>
		);
	},
	getIcon() {
		const {
			icon,
		} = this.props;

		return (
			<div className="activity-log-item__icons">
				<div className="activity-log-item__icon">
					<Gridicon icon={ icon || 'info-outline' } size={ 24 } />
				</div>
			</div>
		);
	},

	getActor() {
		const {
			user,
		} = this.props;

		return (
			<div className="activity-log-item__actor">
				<div className="activity-log-item__actor-icon">
					<Gravatar user={ user } size={ 48 } />
				</div>
				<div className="activity-log-item__actor-info">
					<div className="activity-item__actor-name">John D.</div>
					<div className="activity-item__actor-role">Admin</div>
				</div>
			</div>
		);
	},

	getContent() {
		const {
		} = this.props;

		return (
			<div className="activity-log-item__content">
				<div className="activity-item__content-main">Tread found in Plugin</div>
				<div className="activity-item__content-sub">Malware code detected...</div>
			</div>
		);
	},

	getAction() {
		const {
		} = this.props;

		return (
			<div className="activity-log-item__action">
				<Button>Do Stuff</Button>
			</div>
		);
	},

	render() {
		return (
			<div className="activity-log-item" >
				<div className="activity-log-item__type">
				{ this.getTime() }
				{ this.getIcon() }
				</div>
				<Card className="activity-log-item__card">
					{ this.getActor() }
					{ this.getContent() }
					{ this.getAction() }
				</Card>
			</div>
		);
	}
} );

export default localize( ActivityLogItem );
