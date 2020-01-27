import {MarfeelDoughnutGramChartService} from "./components/marfeel-doughnut-gram-chart/marfeel-doughnut-gram-chart.service";
import {MarfeelDoughnutGramChart} from "./components/marfeel-doughnut-gram-chart/marfeel-doughnut-gram-chart";
import {RevenueChartService} from "./domain/revenue/revenue-chart.service";
import {ImpressionsChartService} from "./domain/impressions/impressions-chart.service";
import {VisitsChartService} from "./domain/visits/visits-chart.service";

function app() {
    const MAIN_ELEMENT = document.getElementsByTagName("main").item(0);
    if(!MAIN_ELEMENT) return;

    const addElementToPage = (element) => {
        MAIN_ELEMENT.append(element);
    };

    const onError = (error) => {
        console.log(error);
        addErrorMessageToPage(error.message);
    };

    const addErrorMessageToPage = (errorMessage) => {
        const errorElement = document.createElement("p");
        errorElement.classList.add("error");
        errorElement.innerText = errorMessage;
        MAIN_ELEMENT.append(errorElement);
    };
    const services = [
        new RevenueChartService(),
        new ImpressionsChartService(),
        new VisitsChartService()
    ];
    const doughnutChartService = new MarfeelDoughnutGramChartService();
    services.forEach(service => {
        const api = service.getApi();
        return Promise.all([
            api.getTotalsByMedia(),
            api.getDailyLastMonth()
        ]).then(
            ([totalsByMedia, lastMonthDailyTotals]) =>
                doughnutChartService.getMarfeelDoughnutChartData(totalsByMedia, lastMonthDailyTotals)
        ).then(
            chartData => {
                const theme = service.getTheme();
                addElementToPage(
                    new MarfeelDoughnutGramChart(
                        chartData,
                        theme.getTitle(),
                        theme.getFormatter(),
                        theme.getSort(),
                        theme.getColors()
                    )
                )
            }
        ).catch(onError);
    });

}

window.onload = app;

