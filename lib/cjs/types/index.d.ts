/**
 * Description: Converts process.env variables to Number, Object, Array, Boolean
 *
 * @class Configurator
 */
declare class Configurator {
    $__CACHE: Record<string, any>;
    /**
     * Takes the variables, loops and performs conversion to types
     * @constructor
     *
     * @param {Record<string, string>} $_VARIABLES
     */
    constructor($_VARIABLES: Record<string, string>);
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
    GET($_NAME: string, $_DEFAULT?: any): any;
}
export default Configurator;
//# sourceMappingURL=index.d.ts.map