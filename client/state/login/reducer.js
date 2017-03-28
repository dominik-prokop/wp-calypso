/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import magicLogin from './magic-login/reducer';

import {
	LOGIN_REQUEST,
	LOGIN_REQUEST_FAILURE,
	LOGIN_REQUEST_SUCCESS,
	LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST,
	LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST_SUCCESS,
	LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST_FAILURE
} from 'state/action-types';

export const isRequesting = createReducer( false, {
	[ LOGIN_REQUEST ]: () => true,
	[ LOGIN_REQUEST_FAILURE ]: () => false,
	[ LOGIN_REQUEST_SUCCESS ]: () => false,
} );

export const isSubmittingVerificationCode = createReducer( false, {
	[ LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST ]: () => true,
	[ LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST_FAILURE ]: () => false,
	[ LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST_SUCCESS ]: () => false,
} );

export const requestError = createReducer( null, {
	[ LOGIN_REQUEST ]: () => null,
	[ LOGIN_REQUEST_SUCCESS ]: () => null,
	[ LOGIN_REQUEST_FAILURE ]: ( state, { error } ) => error
} );

export const verificationCodeSubmissionError = createReducer( null, {
	[ LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST ]: () => null,
	[ LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST_SUCCESS ]: () => null,
	[ LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST_FAILURE ]: ( state, { error } ) => error
} );

export const requestSuccess = createReducer( null, {
	[ LOGIN_REQUEST ]: () => null,
	[ LOGIN_REQUEST_SUCCESS ]: () => true,
	[ LOGIN_REQUEST_FAILURE ]: () => false
} );

export const verificationCodeSubmissionSuccess = createReducer( null, {
	[ LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST ]: () => null,
	[ LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST_SUCCESS ]: () => true,
	[ LOGIN_2FA_VERIFICATION_CODE_SEND_REQUEST_FAILURE ]: () => false
} );

export const twoFactorAuth = createReducer( null, {
	[ LOGIN_REQUEST ]: () => null,
	[ LOGIN_REQUEST_SUCCESS ]: ( state, { data } ) => data,
	[ LOGIN_REQUEST_FAILURE ]: () => null
} );

export default combineReducers( {
	isRequesting,
	magicLogin,
	isSubmittingVerificationCode,
	requestError,
	verificationCodeSubmissionError,
	requestSuccess,
	verificationCodeSubmissionSuccess,
	twoFactorAuth,
} );
