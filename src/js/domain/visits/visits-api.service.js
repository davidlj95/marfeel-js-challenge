import {randomHistogram} from "../../helpers/array";

export class VisitsApiService {

    constructor() {
        this._MOCK_TOTALS_BY_MEDIA = {
            'Tablet': 480*10**6,
            'Smartphone': 120*10**6
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
