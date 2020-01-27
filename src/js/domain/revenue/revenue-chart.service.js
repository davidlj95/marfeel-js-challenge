import {RevenueApiService} from "./revenue-api.service";
import {RevenueThemeService} from "./revenue-theme.service";

export class RevenueChartService {

    getApi() {
        return new RevenueApiService()
    }

    getTheme() {
        return new RevenueThemeService()
    }
}
