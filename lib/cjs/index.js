"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
     * @param {Record<string, string>} $_VARIABLES
     */
    constructor($_VARIABLES) {
        this.$__CACHE = {};
        for (const $_KEY in $_VARIABLES) {
            if ($_VARIABLES.hasOwnProperty($_KEY)) {
                let $_RES;
                switch (true) {
                    case ($_VARIABLES[$_KEY].toLowerCase() === 'false'
                        || $_VARIABLES[$_KEY].toLowerCase() === 'off'
                        || $_VARIABLES[$_KEY].toLowerCase() === 'no'):
                        $_RES = false;
                        break;
                    case ($_VARIABLES[$_KEY].toLowerCase() === 'true'
                        || $_VARIABLES[$_KEY].toLowerCase() === 'on'
                        || $_VARIABLES[$_KEY].toLowerCase() === 'yes'):
                        $_RES = true;
                        break;
                    case ($_VARIABLES[$_KEY].includes('{') && $_VARIABLES[$_KEY].includes('}')):
                        try {
                            $_RES = JSON.parse($_VARIABLES[$_KEY]);
                        }
                        catch (error) {
                            $_RES = `PARSING_ERROR: ERROR WHILE PARSING [ ${$_KEY} ] TO OBJECT `;
                            console.log($_RES);
                        }
                        break;
                    case ($_VARIABLES[$_KEY].includes('[') && $_VARIABLES[$_KEY].includes(']')):
                        try {
                            $_RES = Array.from(JSON.parse($_VARIABLES[$_KEY]));
                        }
                        catch (error) {
                            $_RES = `PARSING_ERROR: ERROR WHILE PARSING [ ${$_KEY} ] TO ARRAY `;
                            console.log($_RES);
                        }
                        break;
                    default:
                        if (!Number.isNaN(Number($_VARIABLES[$_KEY]))) {
                            $_RES = Number($_VARIABLES[$_KEY]);
                        }
                        else {
                            $_RES = $_VARIABLES[$_KEY];
                        }
                        break;
                }
                if ($_RES !== 'PARSING_ERROR')
                    this.$__CACHE[$_KEY] = $_RES;
            }
        }
    }
    /**
     * Description: Takes name of a variable and returns the value
     *
     * @param {string} $_NAME
     * @param {any} $_DEFAULT
     *
     * @returns {any}
     *
     * @public
     * @method
     */
    GET($_NAME, $_DEFAULT) {
        return this.$__CACHE.hasOwnProperty($_NAME) && typeof this.$__CACHE[$_NAME] !== 'undefined'
            ? this.$__CACHE[$_NAME]
            : $_DEFAULT;
    }
}
exports.default = Configurator;
