/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { transferStates } from 'state/automated-transfer/constants';

import { isFailed } from '../is-automated-transfer-active';

describe( 'Automated Transfer', () => {
	describe( 'isActive()', () => {
		it( 'should return `null` if no information is available', () => {
			expect( isFailed( null ) ).to.be.null;
			expect( isFailed( '' ) ).to.be.null; // plausible that the status could wind up as an empty string
		} );

		it( 'should return `true` for active transfer states', () => {
			expect( isFailed( transferStates.CONFLICTS ) ).to.be.true;
			expect( isFailed( transferStates.FAILURE ) ).to.be.true;
		} );

		it( 'should return `false` for non-active transfer states', () => {
			expect( isFailed( transferStates.COMPLETE ) ).to.be.false;
			expect( isFailed( transferStates.INQUIRING ) ).to.be.false;
			expect( isFailed( transferStates.START ) ).to.be.false;
		} );
	} );
} );
