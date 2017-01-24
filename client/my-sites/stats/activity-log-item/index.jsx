/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';
import classNames from 'classnames';
import {
	noop,
} from 'lodash';

/**
 * Internal dependencies
 */
import Card from 'components/card/compact';
import Button from 'components/button';
import Gridicon from 'gridicons';
import Gravatar from 'components/gravatar';

class ActivityLogItem extends Component {

	static propTypes = {
		title: PropTypes.string,
		subTitle: PropTypes.string,
		className: PropTypes.string,
		icon: PropTypes.string,
		user: PropTypes.object,
		onClick: PropTypes.func,
		actionText: PropTypes.string,
		timestamp: PropTypes.number,
	};

	static defaultProps = {
		onClick: noop,
	};

	getTime() {
		const {
			moment,
			timestamp
		} = this.props;

		return (
			<div className="activity-log-item__time">
				{ moment( timestamp ).format( 'LT' ) }
			</div>
		);
	}

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
	}

	getActor() {
		const {
			user,
		} = this.props;

		return (
			<div className="activity-log-item__actor">
				<Gravatar  user={ user } size={ 48 } />
				{ user && <div className="activity-log-item__actor-info">
					<div className="activity-log-item__actor-name">{ user.name }</div>
					<div className="activity-log-item__actor-role">{ user.role }</div>
				</div>
				}
			</div>
		);
	}

	getContent() {
		const {
			title,
			subTitle
		} = this.props;

		return (
			<div className="activity-log-item__content">
				<div className="activity-log-item__content-title">{ title }</div>
				{ subTitle && <div className="activity-item__content-sub-title">{ subTitle }</div> }
			</div>
		);
	}

	getAction() {
		const {
			onClick,
			actionText
		} = this.props;

		return ( actionText &&
			<div className="activity-log-item__action">
				<Button compact primary onClick={ onClick }>{ actionText }</Button>
			</div>
		);
	}

	render() {
		const {
			className,
		} = this.props;

		const classes = classNames(
			'activity-log-item',
			className
		);
		return (
			<div className={ classes } >
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
}

export default localize( ActivityLogItem );
