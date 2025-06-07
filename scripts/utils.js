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
     * @param {Response} res HTTP Response
     * @param {number} duration 
     * @returns 
     */
    static delayHttpResponse(res, duration) {
        return new Promise((resolve) => setTimeout(() => resolve(res), duration));
    }

    /**
     * @param {Response} rawConfigResponse
     * @returns {{
     *  token: string;
     *  casal: {
     *      pessoa1: string;
     *      pessoa2: string;
     *  };
     *  data: {
     *      dia: number;
     *      mes: number;
     *      ano: number;
     *      hora: number;
     *      minuto: number;
     *      segundo: number;
     *  };
     *  theme: {
     *      scheme: 'light'|'dark';
     *      color: {
     *          primary: string;
     *      };
     *  };
     *  metadata: {
     *      musica: boolean;
     *      videoUrl: boolean;
     *      fotoPrincipal: string;
     *      fotosUrls: string[];
     *      texto: string;
     *  };
     * }}
     */
    static parseRawConfigToObject(rawConfigResponse) {
        const config = rawConfigResponse.json();
        return config;
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
