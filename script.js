var stopRender = false;
const url = window.location.search;
const urlParams = new URLSearchParams(url);
const choice = urlParams.get('choice');
const userId = urlParams.get('id');

carPlot = document.getElementById('carPosition');
botPlot = document.getElementById('botPosition');
speedPlot = document.getElementById('carSpeed');
stopModel = document.getElementById('stopModel');
restartModel = document.getElementById('restartModel');
startModel = document.getElementById('startModel')

var carStartPosition = {x: 0, z: 322.5, r: 0};

var botsStartPosition = [
    {x: 0, z: 300, r: 0}
];
var botsPositions = [
    {x: 0, z: 300, r: 0}
];

var carCoords = [];
var speedCoords = [];


/******* Plot Settings ******/

var carTrace = {
    x: [],
    y: [],
    mode: 'lines',
    line: {
        width: 3
    },
    showlegend: false
};

var carSpeed = {
    x: [],
    y: [],
    mode: 'lines'
};

var path1 = {
    x: [-11, 11],
    y: [3, 3],
    mode: 'lines',
    line: {
        shape: 'linear',
        width: 0.5,
        color: 'rgb(0,0,0)'},
    type: 'scatter',
    showlegend: false
};

var path2 = {
    x: [-11, -12.628, -12.99, -12.628, -11],
    y: [3, 1.435, 0.056, -1.435, -3],
    mode: 'lines',
    name: 'spline',
    line: {
        shape: 'spline',
        width: 0.5,
        color: 'rgb(0, 0, 0)'},
    type: 'scatter',
    showlegend: false
};

var path3 = {
    x: [-11, 11],
    y: [-3, -3],
    mode: 'lines',
    line: {
        shape: 'linear',
        width: 0.5,
        color: 'rgb(0, 0, 0)'},
    type: 'scatter',
    showlegend: false
};

var path4 = {
    x: [11, 12.628, 12.99, 12.628, 11],
    y: [-3, -1.435, -0.056, 1.435, 3],
    mode: 'lines',
    name: 'spline',
    line: {
        shape: 'spline',
        width: 0.5,
        color: 'rgb(0, 0, 0)'},
    type: 'scatter',
    showlegend: false
};

var carPlotLayout = {
    xaxis: {
        range: [-15, 15]
    },
    yaxis: {
        range: [-5, 5]
    },
    margin: {t: 25, l: 20, r: 10, b: 25}
};

var carSpeedPlotLayout = {
    margin: {t: 25, l: 25, r: 10, b: 25}
};

var botPlotLayout = {
    xaxis: {
        range: [-15, 15]
    },
    yaxis: {
        range: [-5, 5]
    },
    margin: {t: 25, l: 25, r: 10, b: 25}
};

stopModel.onclick = function stopRenderLoop() {
    stopRender = true;
    stopModel.classList.add("d-none");
    restartModel.classList.remove("d-none");
};

restartModel.onclick = function () {
    location.reload();
};

/******* Get input coordinates from json ******/

function getStartCoord(setCoords) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var jsonData = JSON.parse(this.responseText);
            setCoords(jsonData);
        }
    };
    xmlhttp.open("GET", "coordinates/input_coords/inputCoords.json", true);
    xmlhttp.send();
}
function getStartCoordBus(setCoords) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var jsonData = JSON.parse(this.responseText);
            setCoords(jsonData);
        }
    };
    xmlhttp.open("GET", "coordinates/input_coords/inputBots.json", true);
    xmlhttp.send();
}
function getPosCoordBus(setCoords) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "coordinates/input_coords/positionsBots/positionsBots"+userId+".json", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var jsonData = JSON.parse(this.responseText);
            setCoords(jsonData);
        }
    };

}
getStartCoord(function (data) {
    if (data["car"]) {
        var jsonCar = data["car"];
        carStartPosition = jsonCar[0];
    }
    /*if (data["bots"]) {
        botsStartPosition = data["bots"];
    }*/
});
getStartCoordBus(function (data) {
    if (data) {
        botsStartPosition = data;
    }
    console.log(botsStartPosition)
});
/*getPosCoordBus(function (data) {
    if (data) {
        botsPositions = data;
    }
    console.log(botsPositions)
});*/



/******* Save position and speed of car in time to json ******/

function saveCoord() {
    var car = carCoords;
    var speed = speedCoords;
    var graphCar = carTrace;
    var graphSpeed = carSpeed;

    var data = JSON.stringify({car, speed, graphCar, graphSpeed});

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            alert("Dáta sa úspešne uložili na server!");
        }
    };
    xmlhttp.open("POST", "coords.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(data);
}


/******* Set variables and draw all plots ******/

function traceCarPosition(posX, posZ) {
    var pX = posX / 100;
    var pZ = posZ / 100;

    if (!(carTrace.x[carTrace.x.length - 1] === pX && carTrace.y[carTrace.y.length - 1] === pZ)) {
        carTrace.x.push(pX);
        carTrace.y.push(pZ);

        var coord = {x: pX * 100, z: pZ * 100};
        carCoords.push(coord);

        Plotly.newPlot(carPlot, [carTrace, path1, path2, path3, path4], carPlotLayout);
    }
}

function traceBotsPosition(bots) {
    var carPosition = carCoords[carCoords.length - 1];

    var car =  {
        x: [carPosition.x / 100],
        y: [carPosition.z / 100],
        mode: 'markers',
        name: 'car',
        marker: {
            size: 12
        }
    };

    var botsTrace = [car, path1, path2, path3, path4];

    for (var i = 0; i < bots.length; i++) {

        var botTrace = {
            x: [bots[i].position.x / 100],
            y: [bots[i].position.z / 100],
            mode: 'markers',
            name: 'bus '+(i+1),
            marker: {
                size: 12
            }
        };
        botsTrace.push(botTrace);

    }

    Plotly.newPlot(botPlot, botsTrace, botPlotLayout);

}

function traceCarSpeed(speed, time) {

    carSpeed.x.push(time / 1000);
    carSpeed.y.push(speed);

    var coord = {speed: speed, time: time};
    speedCoords.push(coord);

    Plotly.newPlot(speedPlot, [carSpeed], carSpeedPlotLayout);
}