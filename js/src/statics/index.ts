import * as ChartJs from 'chart.js';
import * as $ from 'jquery';

new ChartJs.Chart(<HTMLCanvasElement> $('#chartContainer').get(0), {
    type: 'bar',
    data: {
        labels: ["北京烤鸭", "东坡肉", "菜心"],
        datasets: [{
            label: "菜品",
            data: [75, 65, 49],
            fill: false,
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)"],
            borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)"],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: "菜品统计",
            fontSize: 20
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
