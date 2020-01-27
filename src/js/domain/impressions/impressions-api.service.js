import {randomHistogram} from "../../helpers/array";

export class ImpressionsApiService {

    constructor() {
        this._MOCK_TOTALS_BY_MEDIA = {
            'Tablet': 20 * 10 ** 6,
            'Smartphone': 30 * 10 ** 6
        };
        this._MOCK_DAILY_LAST_MONTH = randomHistogram(31);
    }

    async getTotalsByMedia() {
        return this._MOCK_TOTALS_BY_MEDIA;
    }

    async getDailyLastMonth() {
        return this._MOCK_DAILY_LAST_MONTH;
    }
}
