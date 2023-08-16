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
declare class DotConfigurator {
    /**
     * Description: Map structure that holds every converted value from process.env.
     *
     * @property {Map<string, any>} $__CACHE
     * @private
     * @readonly
     */
    private readonly $__CACHE;
    /**
     * Description: Takes the process.env, loops and performs conversion to different types.
     * @constructor
     *
     * @param {Record<string, string>} $_VARIABLES
     */
    constructor($_VARIABLES: Record<string, string>);
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
    GET($_NAME: string, $_DEFAULT?: any): any;
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
    static fromProcessEnv(processEnv: Record<string, string>): DotConfigurator;
}
export default DotConfigurator;
//# sourceMappingURL=index.d.ts.map