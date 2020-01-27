import {ImpressionsApiService} from "./impressions-api.service";
import {ImpressionsThemeService} from "./impressions-theme.service";

export class ImpressionsChartService {

    getApi() {
        return new ImpressionsApiService()
    }

    getTheme() {
        return new ImpressionsThemeService()
    }
}
