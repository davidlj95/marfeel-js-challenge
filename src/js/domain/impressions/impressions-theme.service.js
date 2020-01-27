import {SORT_DESCENDING} from "../../constants/sort";
import {defaultNumberFormatter} from "../../helpers/formatter";

export class ImpressionsThemeService {

    getSort() {
        return SORT_DESCENDING;
    }

    getTitle() {
        return "Impressions"
    }

    getFormatter() {
        return defaultNumberFormatter
    }

    getColors() {
        return {
            accents: ['#6BCEE3', '#2E5264'],
            histogram: {
                line: '#DAEFF5',
                area: '#F6FAFB'
            }
        }
    }
}
