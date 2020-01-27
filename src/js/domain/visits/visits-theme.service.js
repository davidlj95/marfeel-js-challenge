import {defaultNumberFormatter} from "../../helpers/formatter";
import {SORT_ASCENDING} from "../../constants/sort";

export class VisitsThemeService {

    getTitle() {
        return "Visits"
    }

    getSort() {
        return SORT_ASCENDING;
    }

    getFormatter() {
        return defaultNumberFormatter;
    }

    getColors() {
        return {
            accents: ['#F0C32B', '#C25726'],
            histogram: {
                line: '#F5EBC1',
                area: '#FDFAF3'
            }
        };
    }

}
