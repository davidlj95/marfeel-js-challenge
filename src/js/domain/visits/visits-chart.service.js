import {VisitsApiService} from "./visits-api.service";
import {VisitsThemeService} from "./visits-theme.service";

export class VisitsChartService {

    getApi() {
        return new VisitsApiService()
    }

    getTheme() {
        return new VisitsThemeService()
    }
}
