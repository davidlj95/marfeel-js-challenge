import {noDecimalsEuroFormatter} from "../../helpers/formatter";
import {SORT_ASCENDING} from "../../constants/sort";

export class RevenueThemeService {

    getTitle() {
        return "Revenue"
    }

    getSort() {
        return SORT_ASCENDING;
    }

    getFormatter() {
        return noDecimalsEuroFormatter;
    }

    getColors() {
        return {
            accents: ['#87D63D', '#386A15'],
            histogram: {
                line: '#DBE8C8',
                area: '#F6FBF4'
            }
        }
    }

    async getTotalsByMedia() {
        return this._MOCK_TOTALS_BY_MEDIA;
    }

    async getDailyLastMonth() {
        return this._MOCK_DAILY_LAST_MONTH;
    }
}
