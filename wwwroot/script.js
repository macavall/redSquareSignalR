// script.js

"use strict";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var x = 1400;//canvas.width / 2;
var y = 800; // canvas.height / 2;

drawSquare();

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("UpdateSquarePosition", function (newX, newY) {
    x = newX;
    y = newY;
    drawSquare();
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.addEventListener("keydown", function (event) {
    var newX = x;
    var newY = y;
    switch (event.key) {
        case "ArrowUp":
            newY -= 10;
            break;
        case "ArrowDown":
            newY += 10;
            break;
        case "ArrowLeft":
            newX -= 10;
            break;
        case "ArrowRight":
            newX += 10;
            break;
    }

    if (newX !== x || newY !== y) {
        x = newX;
        y = newY;
        drawSquare();
        connection.invoke("UpdateSquarePosition", newX, newY).catch(function (err) {
            return console.error(err.toString());
        });
    }
});

function drawSquare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(x - 25, y - 25, 50, 50);
}
