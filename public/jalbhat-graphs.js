const firebaseConfig = {
    apiKey: "AIzaSyDlELr4sUiin44q4C2nOk2FoCjhU97wpb4",
    authDomain: "jalbat-fae7c.firebaseapp.com",
    databaseURL: "https://jalbat-fae7c.firebaseio.com",
    projectId: "jalbat-fae7c",
    storageBucket: "jalbat-fae7c.appspot.com",
    messagingSenderId: "430029289123",
    appId: "1:430029289123:web:de9f5c04b92eef956b7116",
    measurementId: "G-HEYVS35KH8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// Declare constants

const database = firebase.database();
const vol_dependencies = database.ref('vol_dependencies');
const health_dependencies = database.ref('health_dependencies');
const ctx = document.getElementById('main-chart');
var data ={
speed: 0,
vol: 0,
ph: 0,
turbidity: 0,
temp: 0
}
var vol_dep_chart = null, ph_chart=null, turbidity_chart=null, temp_chart=null, usage_chart=null;
// chart initialization

// functions to get data from firebase
vol_dependencies.child('ls').on('value', function(snapshot) {
// This snapshot returns the value of total litres/seconds automatically
data.speed = parseFloat(snapshot.val());
try{
if(vol_dep_chart != null){
var a = new Date();
addData(vol_dep_chart, a, {x: a, y: data.speed}, 0);
}
}
catch(e){
console.log("chart yet not drawn", e);
}
$('.ls').text(snapshot.val());
});

vol_dependencies.child('total').on('value', function(snapshot) {
// This snapshot returns the value of total litres automatically
data.vol = parseFloat(snapshot.val());
try{
if(vol_dep_chart != null){
var a = new Date();
addData(vol_dep_chart, a, {x: a, y: data.vol}, 1);
}
}
catch(e){
console.log("chart yet not drawn", e);
}
$('.total').text(snapshot.val());
//  updateGlobalVol(snapshot.val());
});

health_dependencies.child('pH').on('value', function(snapshot) {
data.ph = parseInt(snapshot.val());
try{
if(ph_chart != null){
var a = new Date();
addData(ph_chart, a, {x: a, y: data.ph}, 0);
}
}
catch(e){
console.log("chart yet not drawn", e);
}
$('.ph').text(snapshot.val());
});

health_dependencies.child('turbidity').on('value', function(snapshot) {
    data.turbidity = parseInt(snapshot.val());
    try{
    if(turbidity_chart != null){
    var a = new Date();
    addData(turbidity_chart, a, {x: a, y: data.turbidity}, 0);
    }
    }
    catch(e){
    console.log("chart yet not drawn", e);
    }
    $('.turbidity').text(snapshot.val());
    });
    

health_dependencies.child('temp').on('value', function(snapshot) {
data.temp = parseInt(snapshot.val());
try{
if(temp_chart != null){
var a = new Date();
addData(temp_chart, a, {x: a, y: data.temp}, 0);
}
}
catch(e){
console.log("chart yet not drawn", e);
}
$('.temp').text(snapshot.val());
});



function addData(chart, label, data, id) {
chart.data.labels.push(label);
chart.data.datasets[id].data.push(data);
chart.update();
}

var options = {
responsive: false,
title: {
  display: true,
  text: 'Speed'
},
scales: {
  xAxes: [{
      display: true
  }],
  yAxes: [{
      display: true
  }]
}
}

var Vol_dep_data = {
 labels: [String(new Date())],
 datasets: [
     {
         label: "Speed",
         fill: true,
         lineTension: 0.1,
         backgroundColor: "rgba(75,192,192,0.4)",
         borderColor: "rgba(75,192,192,1)",
         borderCapStyle: 'butt',
         borderDash: [],
         borderDashOffset: 0.0,
         borderJoinStyle: 'miter',
         pointBorderColor: "rgba(75,192,192,1)",
         pointBackgroundColor: "#fff",
         pointBorderWidth: 1,
         pointHoverRadius: 5,
         pointHoverBackgroundColor: "rgba(75,192,192,1)",
         pointHoverBorderColor: "rgba(220,220,220,1)",
         pointHoverBorderWidth: 2,
         pointRadius: 1,
         pointHitRadius: 10,
         data: [{x: new Date(),y: data.speed}],
         spanGaps: false,
     },
     {
         label: "Volume",
         fill: true,
         lineTension: 0.1,
         backgroundColor: "rgba(192,75,192,0.4)",
         borderColor: "rgba(192,75,192,1)",
         borderCapStyle: 'butt',
         borderDash: [],
         borderDashOffset: 0.0,
         borderJoinStyle: 'miter',
         pointBorderColor: "rgba(192,75,192,1)",
         pointBackgroundColor: "#fff",
         pointBorderWidth: 1,
         pointHoverRadius: 5,
         pointHoverBackgroundColor: "rgba(192,75,192,1)",
         pointHoverBorderColor: "rgba(220,220,220,1)",
         pointHoverBorderWidth: 2,
         pointRadius: 1,
         pointHitRadius: 10,
         data: [{x: new Date(),y: data.vol}],
         spanGaps: false,
     }
 ]
};

vol_dep_chart = new Chart(ctx, {
 type: 'line',
 data: Vol_dep_data,
 options: options
});


var ph_data = {
  labels: [String(new Date())],
  datasets: [
      {
          label: "PH",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,72,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,72,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,72,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [{x: new Date(),y: data.ph}],
          spanGaps: false,
      }
  ]
};

var optionsPh = options;
optionsPh.title.text = "PH Value";

ph_chart = new Chart('ph_chart', {
  type: 'bar',
  data: ph_data,
  options: optionsPh
});

var tur_data = {
   labels: [String(new Date())],
   datasets: [
       {
           label: "Turbidity",
           fill: true,
           lineTension: 0.1,
           backgroundColor: "rgba(75,192,192,0.4)",
           borderColor: "rgba(75,192,72,1)",
           borderCapStyle: 'butt',
           borderDash: [],
           borderDashOffset: 0.0,
           borderJoinStyle: 'miter',
           pointBorderColor: "rgba(75,192,72,1)",
           pointBackgroundColor: "#fff",
           pointBorderWidth: 1,
           pointHoverRadius: 5,
           pointHoverBackgroundColor: "rgba(75,192,72,1)",
           pointHoverBorderColor: "rgba(220,220,220,1)",
           pointHoverBorderWidth: 2,
           pointRadius: 1,
           pointHitRadius: 10,
           data: [{x: new Date(),y: data.turbidity}],
           spanGaps: false,
       }
   ]
};

var optionsTur = options;
optionsTur.title.text = "Turbidity";

turbidity_chart = new Chart('turbidity_chart', {
   type: 'bar',
   data: tur_data,
   options: options
});


var temp_data = {
    labels: [String(new Date())],
    datasets: [
        {
            label: "Temperature",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,72,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,72,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,72,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [{x: new Date(),y: data.temp}],
            spanGaps: false,
        }
    ]
};

var optionsTemp = options;
optionsTemp.title.text = "Temperature";

temp_chart = new Chart('temp_chart', {
    type: 'bar',
    data: temp_data,
    options: options
 });
