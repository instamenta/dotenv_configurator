/**
 * Description: Converts process.env variables to different types.
 * - Number,
 * - Object,
 * - Array,
 * - Boolean
 * - String
 *
 * @class DotConfigurator
 *
 * @example
 * const dotEnv = DotConfigurator.fromProcessEnv(process.env);
 *   &&
 * const doeEnv = new DotConfigurator(process.env);
 */
class DotConfigurator {

    /**
     * Description: Map structure that holds every converted value from process.env.
     *
     * @property {Map<string, any>} $__CACHE
     * @private
     * @readonly
     */
    private readonly $__CACHE: Map<string, any> = new Map<string, any>();

    /**
     * Description: Takes the process.env, loops and performs conversion to different types.
     * @constructor
     *
     * @param {Record<string, string>} $_VARIABLES
     */
    constructor($_VARIABLES: Record<string, string>) {
        for (const $_KEY in $_VARIABLES) {
            if ($_VARIABLES.hasOwnProperty($_KEY)) {
                let $_RES: number | string | object | Array<any> | boolean;
                switch (true) {
                    case ($_VARIABLES[$_KEY].toLowerCase() === 'false'
                        || $_VARIABLES[$_KEY].toLowerCase() === 'off'
                        || $_VARIABLES[$_KEY].toLowerCase() === 'no'
                    ):
                        $_RES = false;
                        break;
                    case ($_VARIABLES[$_KEY].toLowerCase() === 'true'
                        || $_VARIABLES[$_KEY].toLowerCase() === 'on'
                        || $_VARIABLES[$_KEY].toLowerCase() === 'yes'
                    ):
                        $_RES = true;
                        break;
                    case ($_VARIABLES[$_KEY].includes('{') && $_VARIABLES[$_KEY].includes('}')):
                        try {
                            $_RES = JSON.parse($_VARIABLES[$_KEY]);
                        } catch (error) {
                            $_RES = `PARSING_ERROR: ERROR WHILE PARSING [ ${$_KEY} ] TO OBJECT `;
                            console.log($_RES);
                        }
                        break;
                    case ($_VARIABLES[$_KEY].includes('[') && $_VARIABLES[$_KEY].includes(']')):
                        try {
                            $_RES = Array.from(JSON.parse($_VARIABLES[$_KEY]));
                        } catch (error) {
                            $_RES = `PARSING_ERROR: ERROR WHILE PARSING [ ${$_KEY} ] TO ARRAY `;
                            console.log($_RES);
                        }
                        break;
                    default:
                        if (!Number.isNaN(Number($_VARIABLES[$_KEY]))) {
                            $_RES = Number($_VARIABLES[$_KEY]);
                        } else {
                            $_RES = $_VARIABLES[$_KEY];
                        }
                        break;
                }
                this.$__CACHE.set($_KEY, $_RES);
            }
        }
    }

    /**
     * Description: use .GET method to get any variable that is present in the dotEnv
     * (Optional) supply second parameter if you want to provide default value.
     *
     * @param {string} $_NAME
     * @param {any} $_DEFAULT
     *
     * @returns {any}
     *
     * @public
     * @method
     *
     * @example
     * const PORT = dotEnv.GET('PORT', 4000) // CLASS.GET($NAME, ?$DEFAULT_VALUE)
     */
    public GET($_NAME: string, $_DEFAULT?: any): any {
        return this.$__CACHE.has($_NAME) ? this.$__CACHE.get($_NAME) : $_DEFAULT;
    }

    /**

     *
     * Description: (Singleton Pattern) static method used for getting instance of the DotConfigurator.
     *
     * @param {Record<string, string>} processEnv
     * @return {DotConfigurator}
     *
     * @public
     * @static
     * @method
     *
     * @example
     * const dotEnv = DotConfigurator.fromProcessEnv(process.env);
     * const PORT = dotEnv.GET('PORT', 4000) // CLASS.GET($NAME, ?$DEFAULT_VALUE)
     */
    public static fromProcessEnv(processEnv: Record<string, string>): DotConfigurator {
        return new DotConfigurator(processEnv);
    }
}

export default DotConfigurator;
