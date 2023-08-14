'use strict';

/**
 * Description: Converts process.env variables to Number, Object, Array, Boolean
 *
 * @class Configurator
 */
class Configurator {
	/**
	 * Takes the variables, loops and performs conversion to types
	 * @constructor
	 *
	 * @param {any} $variables
	 */
	constructor($variables) {
		this.cache = {};
		for ( let i = 0, len = $variables.length; i < len; i++ ) {
			let $var = $variables[$variables[i]];

			switch ( true ) {
				case ($var.toLowerCase() === 'false'
					|| $var.toLowerCase() === 'off'
					|| $var.toLowerCase() === 'no'
				):
					$var = false;
					break;
				case ($var.toLowerCase() === 'true'
					|| $var.toLowerCase() === 'on'
					|| $var.toLowerCase() === 'yes'
				):
					$var = true;
					break;
				case ($var.includes('{') && $var.includes('}')):
					try {
						$var = JSON.parse($var);
					} catch ( error ) {
						$var = 'PARSING_ERROR';
					}
					break;
				case ($var.includes('[') && $var.includes(']')):
					try {
						$var = Array.from(JSON.parse($var));
					} catch ( error ) {
						$var = 'PARSING_ERROR';
					}
					break;
				case (!Number.isNaN($var)):
					$var = Number($var);
					break;
			}
			if( $var !== 'PARSING_ERROR' ) this.cache[$variables[i]] = $var;
		}
	}

	/**
	 * Description: Takes name of a variable and returns the value
	 *
	 * @param {string} $name
	 *
	 * @returns {any}
	 *
	 * @public
	 * @method
	 */
	GET($name) {
		if( this.cache.hasOwnProperty($name) ) {
			return this.cache[$name];
		} else {
			console.log('Unknown variable: ', $name);
		}
	}
}

module.exports = Configurator;