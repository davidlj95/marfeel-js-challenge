export class MarfeelDoughnutGramChartService {

    constructor() {
    }

    getMarfeelDoughnutChartData(
        doughnutData,
        histogramData
    ) {
        return {
            doughnut: doughnutData,
            histogram: histogramData
        }
    }

}
