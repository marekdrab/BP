<?php
include "config.php";
?>
<!DOCTYPE html>
<html lang="<?= $lang['lang'] ?>">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Marek Drab">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $lang['model'] ?> | Simulation of Vehicle</title>

    <script src="lib/jquery/jquery.min.js"></script>
    <script src="lib/bootstrap/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="icon" type="image/png" href="favicon.png">


</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-transparent-9 fixed-top">
    <div class="container">
        <a class="navbar-brand" href="index.php">Simulation of Vehicle</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.php"><?= $lang['home'] ?></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="record.php"><?= $lang['record'] ?></a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<header class="bg-custom py-5 mb-5">
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-lg-12">
                <p class="h5 mt-5 mb-0"></p>
                <h1 class="display-4 font-weight-bold mb-3"><?= $lang['vehicle'] ?></h1>
                <p class="h5 font-weight-normal mb-4"><?= $lang['vehicle-sub'] ?></p>
            </div>
        </div>
    </div>
</header>
<div class="container">
    <form method="post" action="start.php">
        <div class="row">
            <div class="col-md-4 text-center">
                <input type="radio" id="control_01" name="select" value="car" required>
                <label for="control_01" id="label_car">
                    <p class="h5 mt-5 mb-0"><?= $lang['pickup'] ?></p>
                </label>
                <a class="nav-link text-danger font-weight-bold" href="model.php?choice=car">
                    car
                </a>
            </div>
            <div class="col-md-4 text-center">
                <input type="radio" id="control_02" name="select" value="truck" required>
                <label for="control_02" id="label_truck">
                    <p class="h5 mt-5 mb-0"><?= $lang['truck'] ?></p>
                </label>
                <a class="nav-link text-danger font-weight-bold" href="model.php?choice=truck">
                    truck
                </a>

            </div>
            <div class="col-md-4 text-center">
                <input type="radio" id="control_03" name="select" value="bus" required>
                <label for="control_03" id="label_bus">
                    <p class="h5 mt-5 mb-0"><?= $lang['bus'] ?></p>
                </label>
                <a class="nav-link text-danger font-weight-bold" href="model.php?choice=bus">
                    bus
                </a>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12 text-center">
                <h3>pocet botov</h3>
                <input class="form-control" type="number" id="bots" name="bots" required>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 text-center">
                <button class="btn btn-primary" type="submit">Spustit</button>
            </div>
        </div>
    </form>
</div>


<script src="script.js"></script>
</body>
</html>