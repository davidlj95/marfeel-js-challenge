import {randomHistogram} from "../../helpers/array";

export class RevenueApiService {

    constructor() {
        this._MOCK_TOTALS_BY_MEDIA = {
            'Tablet': 120*10**3,
            'Smartphone': 80*10**3
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
