

 var ctx_hum = document.getElementById("myChart_hum").getContext("2d");

 const humidity = [26, 36, 42, 38, 40, 30, 12];
 const temperature = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80,];



 const colors = {
  orange: {
    fill: ["rgba(187, 99, 62, 0.39)"],
    stroke: "#b45931",
  },
  darkBlue: {
    fill: "rgba(13, 82, 129, 0.39)",
    stroke: "#0D5281 ",
  },

};
      /*---------- graphique temperature --------------*/

      const myChart_hum = new Chart(ctx_hum, {
        type: "line",
        
        data: {
          labels: humidity,
          datasets: [
            {
              tension: 0.5,
              label: "Humidité",
              fill: true,
              backgroundColor: colors.darkBlue.fill,
              pointBackgroundColor: colors.darkBlue.stroke,
              borderColor: colors.darkBlue.stroke,
              pointHighlightStroke: colors.darkBlue.stroke,
              data: [26, 36, 42, 38, 40, 30, 12],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          // Can't just just `stacked: true` like the docs say
          scales: {
            yAxes: [
              {
                ticks: [
                  {
                    beginAtZero: true,
                    stacked: true,
                  },
                ],
              },
            ],
          },
          animation: {
            duration: 750,
          },
        },
      })



 var ctx_temp = document.getElementById("myChart_temp").getContext("2d");
 var my_gradient_orange = ctx_temp.createLinearGradient(0, 0, 0, 100);



      /*---------- graphique humidité --------------*/

      const myChart_temp = new Chart(ctx_temp, {
        type: "line",
        data: {
          labels: temperature,
          datasets: [{
              tension: 0.5,
              label: "Température",
              fill: true,
              backgroundColor: colors.orange.fill,
              pointBackgroundColor: colors.orange.stroke,
              borderColor: colors.orange.stroke,
              pointHighlightStroke: colors.orange.stroke,
              data: [26, 36, 42, 38, 40, 30, 12],
              borderWidth: 1,
              pointRadius: 2,
              pointHoverRadius: 2,
            },
          ],
        },
        options: {
          responsive: true,
          // Can't just just `stacked: true` like the docs say
          scales: {
            yAxes: [
              {
                ticks: [
                  {
                    beginAtZero: true,
                    stacked: true,
                  },
                ],
              },
            ],
          },
          animation: {
            duration: 750,
          },
        },
      });


      my_gradient_orange.addColorStop(0, "rgba(248,1,1,1)");
      my_gradient_orange.addColorStop(1, "rgba(187,99,62, 0.39)");
     
      ctx_hum.fillStyle = my_gradient_orange;
     







function Setdatachart(){

var url_graf = "http://92.167.119.186:8080/api/index.php?cptId=1";

var httpRequest = getHttpRequest();
httpRequest.onreadystatechange = function () {
  if (httpRequest.readyState === 4) {
    // On décode le Javascript - variable de temperature
    var data = JSON.parse(httpRequest.responseText);
    var Tabtemp = [];
    var Tabhum = [];
    var Tabdate = [];

    var Id = data.map(function(elem){
      return elem.Rel_Id
    })
    

    for (i = 0; i < data.length; i++) {
      var temp = data[i].Rel_Temp;
      var hum = data[i].Rel_Hum;
      var date = data[i].Rel_Date;
      

      Tabtemp.push(temp);
      Tabhum.push(hum);
      Tabdate.push(date);


    myChart_temp.data.datasets[0].data = Tabtemp
    myChart_temp.data.labels = Tabdate

    myChart_hum.data.datasets[0].data = Tabhum
    myChart_hum.data.labels = Tabdate

    }
  }
  
  }

httpRequest.open("GET", url_graf, true);
httpRequest.send();


myChart_temp.update();
myChart_hum.update();
  //removing the previous selected menu state






}


function updatachart(IdCpt){

var active_cards = document.querySelectorAll('.carte_weather')

active_cards.forEach(active_card => {
active_cards.forEach(act => act.classList.remove('active'));

})
    //removing the previous selected menu state
document.getElementById(IdCpt).setAttribute("class", "carte_weather active", )

  var url_graf = "http://92.167.119.186:8080/api/index.php?cptId="+IdCpt+"";

  var httpRequest = getHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      // On décode le Javascript - variable de temperature
      var data = JSON.parse(httpRequest.responseText);
      var Tabtemp = [];
      var Tabhum = [];
      var Tabdate = [];

      for (i = 0; i < data.length; i++) {
        var temp = data[i].Rel_Temp;
        var hum = data[i].Rel_Hum;
        var date = data[i].Rel_Date

        Tabtemp.push(temp);
        Tabhum.push(hum);
        Tabdate.push(date);


      myChart_temp.data.datasets[0].data = Tabtemp
      myChart_temp.data.labels = Tabdate

      myChart_hum.data.datasets[0].data = Tabhum
      myChart_hum.data.labels = Tabdate

      }}}

  httpRequest.open("GET", url_graf, true);
  httpRequest.send();


  myChart_temp.update();
  myChart_hum.update();
  


}