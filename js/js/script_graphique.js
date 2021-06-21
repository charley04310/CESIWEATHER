// ---------------------   GRAPHIQUE DE DES DIFFERENTS CAPTEURS ------------------------------------


var ctx_hum = document.getElementById("myChart_hum").getContext("2d");
var ctx_temp = document.getElementById("myChart_temp").getContext("2d");

const colors = {
  green: {
    fill: ['rgba(180, 89, 49, 0.7)',
                ],
    stroke: '#b45931',
  },
  lightBlue: {
    stroke: '#6fccdd',
  },
  darkBlue: {
    fill: '#92bed2',
    stroke: '#3282bf',
  },
  purple: {
    fill: '#b45931',
    stroke: '#B55932',
  },
};

const humidity = [26, 36, 42, 38, 40, 30, 12];
const temperature = [5, 9, 10, 9, 18, 19, 20];
const xData_temp = [13, 14, 15, 16, 17, 18, 19];
const xData_hum = [13, 14, 15, 16, 17, 18, 19];

/*---------- graphique temperature --------------*/


const myChart_hum = new Chart(ctx_hum, {
  type: 'line',
  data: {
    labels: xData_hum,
    datasets: [{
      tension: 0.5,
      label: "Humidité Salon",
      fill: true,
      backgroundColor: colors.green.fill,
      pointBackgroundColor: colors.green.stroke,
      borderColor: colors.green.stroke,
      pointHighlightStroke: colors.green.stroke,
      data: humidity,
      borderWidth: 1,
    }]

  },
  options: {
    responsive: true,
    // Can't just just `stacked: true` like the docs say
    scales: {
      yAxes: [{
        ticks:[{
            beginAtZero: true,
            stacked: true,
          }]
      }]
    },
    animation: {
      duration: 750,
    },
  }
})

/*---------- graphique humidité --------------*/

const myChart_temp = new Chart(ctx_temp, {
    type: 'line',
    data: {
      labels: xData_temp,
      datasets: [{
      
        tension: 0.5,
        borderAlign: 'center',
        label: "Température Salon",
        fill: true,
        backgroundColor: colors.purple.fill,
        pointBackgroundColor: colors.purple.stroke,
        borderColor: colors.purple.stroke,
        pointHighlightStroke: colors.purple.stroke,
        borderCapStyle: 'butt',
        data: temperature,
  
      },]
    },
    options: {
      
      responsive: true,
      // Can't just just `stacked: true` like the docs say
      scales: {
        yAxes: [{
          ticks:[{
            beginAtZero: true,
            stacked: true,
          }]
          
        }]
      },
      animation: {
        duration: 750,
      },
    }
  })
