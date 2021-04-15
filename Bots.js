class Bots {
    busVehicles = [];
    truckVehicles = [];

    roadWidth = 0;
    roadHeight = 0;

    /**
     * Create bots
     * @param botsMeshes BotsMeshesStruct
     * @param botsStruct BotsStruct
     */
    CreateBots(botsMeshes, botsStruct) {
        //struktura bots bude: Bus : 1 , Car : 2, ...

        if (botsStruct.Bus > 0) {
            this.createBus(botsMeshes.Bus, botsStruct.Bus)
        }

        if(botsStruct.Truck > 0) {
            //tu si doplni metodu na vytvorenie napr kamionu
        }

    }

    startBusMoving(botIndex) {
        if (this.busVehicles[botIndex].position.x > -this.roadWidth && this.busVehicles[botIndex].position.x < this.roadWidth && this.busVehicles[botIndex].position.z > 0) {
            if (this.busVehicles[botIndex].busVehiclesCorrection === true) {
                this.busVehicles[botIndex].rotate(BABYLON.Axis.Y, -(this.busVehicles[botIndex].sumAngle + 2 * Math.PI), BABYLON.Space.LOCAL);
                this.busVehicles[botIndex].position.x = this.roadWidth;
                this.busVehicles[botIndex].position.z = this.roadHeight;

                this.busVehicles[botIndex].sumAngle = 0;
                this.busVehicles[botIndex].busVehiclesCorrection = false;
            }

            this.busVehicles[botIndex].translate(BABYLON.Axis.X, -this.busVehicles[botIndex].speedCar, BABYLON.Space.LOCAL);
            this.busVehicles[botIndex].position.x = Math.round(this.busVehicles[botIndex].position.x * 100) / 100;
            this.busVehicles[botIndex].position.z = Math.round(this.busVehicles[botIndex].position.z * 100) / 100;

            this.busVehicles[botIndex].turnInterval = 0;

        } else if (this.busVehicles[botIndex].position.x <= -this.roadWidth || this.busVehicles[botIndex].position.x >= this.roadWidth) {
            this.busVehicles[botIndex].busVehiclesCorrection = true;

            if (this.busVehicles[botIndex].turnInterval % 2 === 0) {
                this.busVehicles[botIndex].rotate(BABYLON.Axis.Y, -this.busVehicles[botIndex].turnAngle, BABYLON.Space.LOCAL);
                this.busVehicles[botIndex].sumAngle += -this.busVehicles[botIndex].turnAngle;
            }
            this.busVehicles[botIndex].translate(BABYLON.Axis.X, -this.busVehicles[botIndex].speedCar, BABYLON.Space.LOCAL);

            this.busVehicles[botIndex].turnInterval += 1;

        } else if (this.busVehicles[botIndex].position.x > -this.roadWidth && this.busVehicles[botIndex].position.x < this.roadWidth && this.busVehicles[botIndex].position.z < 0) {
            if (this.busVehicles[botIndex].busVehiclesCorrection === true) {
                this.busVehicles[botIndex].rotate(BABYLON.Axis.Y, -(this.busVehicles[botIndex].sumAngle + Math.PI), BABYLON.Space.LOCAL);
                this.busVehicles[botIndex].position.x = -this.roadWidth;
                this.busVehicles[botIndex].position.z = -this.roadHeight;

                this.busVehicles[botIndex].busVehiclesCorrection = false;
            }

            this.busVehicles[botIndex].translate(BABYLON.Axis.X, -this.busVehicles[botIndex].speedCar, BABYLON.Space.LOCAL);
            this.busVehicles[botIndex].position.x = Math.round(this.busVehicles[botIndex].position.x * 100) / 100;
            this.busVehicles[botIndex].position.z = Math.round(this.busVehicles[botIndex].position.z * 100) / 100;

            this.busVehicles[botIndex].turnInterval = 0;
        }

        var botWheels = this.busVehicles[botIndex].getChildMeshes();
        for (var i = 0; i < botWheels.length; i++) {
            botWheels[i].rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.LOCAL);
        }
    }

    createBus(busMeshes, numberOfBuses) {
        var botBody = busMeshes["bus"];
        var botRightFrontWheel = busMeshes["wheelA"];
        botRightFrontWheel.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
        var botRightRareWheel = botRightFrontWheel.createInstance();

        botRightFrontWheel.parent = botBody;
        botRightRareWheel.parent = botBody;

        botRightFrontWheel.position = new BABYLON.Vector3(-12.2, 0, 4);
        botRightRareWheel.position = new BABYLON.Vector3(12.2, 0, 4);

        var botLeftFrontWheel = busMeshes["wheelB"];
        botLeftFrontWheel.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);

        var botLeftRareWheel = botLeftFrontWheel.createInstance();

        botLeftFrontWheel.parent = botBody;
        botLeftRareWheel.parent = botBody;

        botLeftFrontWheel.position = new BABYLON.Vector3(-12.2, 0, -5);
        botLeftRareWheel.position = new BABYLON.Vector3(12.2, 0, -5);

        botBody.position = new BABYLON.Vector3(0, 0.5, 300);

        for (var i = 0; i < numberOfBuses; i++) { //botsStartPosition.length
            var cloneBot = botBody.clone();
            cloneBot.name = "Autobus" + (1 + i).toString();
            cloneBot.position.x = botsStartPosition[i].x;
            cloneBot.position.z = botsStartPosition[i].z;
            cloneBot.rotation.y = botsStartPosition[i].r;

            cloneBot.busVehiclesCorrection = Math.abs(botsStartPosition[i].z) !== 300;
            cloneBot.sumAngle = botsStartPosition[i].r;
            cloneBot.turnInterval = 0;
            cloneBot.turnAngle = Math.PI / 589;
            cloneBot.speedCar = 0.8;

            this.busVehicles[i] = cloneBot;
        }

        botBody.setEnabled(false);
    }
}

//tieto triedy si mozes doplnit ako chces (volby vozidla) ale musis si prisposobit aj zostatok kodu k tomu. Metoda startBusMoving sa vola z scene.js

class BotsStruct {
    Bus = 0;
    Truck = 0;
}

class BotsMeshesStruct {
    Bus = {};
    Truck = {};
}