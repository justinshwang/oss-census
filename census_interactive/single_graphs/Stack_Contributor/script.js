function graphStack() {
    Highcharts.setOptions({
        colors: ['#e6ecff', '#ccd9ff', '#b3c6ff', '#99b3ff', '#809fff', '#668cff',
                '#4d79ff', '#3366ff', '#1a53ff', '#0040ff', '#0039e6', '#0033cc', 
                '#002db3', '#001a66', '#000d33']
    });
    
    new Highcharts.chart('stack-cont', {
        chart: {
            type: 'area',   
            height: obj.height_ratio + '%' 
        },
        title: {
            text: obj.title
        },
        xAxis: {
            categories: obj.x_categories,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: obj.label_y
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            split: true,
            valueSuffix: ' %'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    radius: 2,
                    lineColor: '#666666'
                }
            }
        },
        series: obj.data
    });
}