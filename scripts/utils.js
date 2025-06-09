export class Utils {
    /**
     * 
     * @param {Location} location 
     * @returns {Map<string, string>}
     */
    static getParamsMapFromUrl(location) {
        const query = location.search;
        const [...params] = query
            .substring(1, query.length)
            .split('&');

        const paramsMap = new Map(params.map(p => p.split('=')));

        return paramsMap;
    }

    /**
     * 
     * @param {*} year 
     * @param {*} month 
     * @param {*} day 
     * @param {*} hour 
     * @param {*} minutes 
     * @param {*} seconds 
     * @returns {Date}
     */
    static createDateObject(year, month, day, hour, minutes, seconds) {
        return new Date(year, month - 1, day, hour, minutes, seconds);
    }
}
