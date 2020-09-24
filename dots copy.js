var yellowDot; // yellow dot image
var blackDot; // black dot image
var yellowSquare; // yellow square image
var blackSquare; // black square image
var dotX; // x coordinate
var dotY; // y coordinate 
var dotArray; // 2d array of dot values
var sizeMod; // changes size of dots
var mouseDown = 0;
var mostRecentX;
var mostRecentY;
var color = 0;
var canvasSize = 480;
var a = 2.2;



$(function () {

    dotArray = new Array(8);
    for (var i = 0; i < dotArray.length; i++) {
        dotArray[i] = new Array(8);
    }

    yellowSquare = new Image();
    yellowSquare.src = "yellowSquare.png";
    blackSquare = new Image();
    blackSquare.src = "blackSquare.png";
    yellowDot = new Image();
    yellowDot.src = "yellowDot.png";
    blackDot = new Image();
    blackDot.src = "blackDot.png";


    //    
    //    yellowDot.onload = function () {
    //        blackDot.onload = function () {
    //            drawGame();
    //        };
    //    };
    //    
    //    blackDot.onload = function () {
    //        yellowDot.onload= function () {
    //            drawGame();
    //        };
    //    };
    //    
    //    yellowSquare.onload = function () {
    //        blackSquare.onload = function() {
    //            drawGame();
    //        };
    //    };
    //    
    //    blackSquare.onload = function () {
    //        yellowSquare.onload = function() {
    //            drawGame();
    //        };
    //    };

    setTimeout(function () {
        console.log("Ran after " + (new Date().getSeconds()) + " seconds");
        drawGame();
    }, 1000);



    document.getElementById("dotView").addEventListener("click", leftClick, false);
    document.getElementById("dotView").addEventListener("contextmenu", rightClick, false);



    document.getElementById("dotView").addEventListener("mousemove", function () {
        if (mouseDown) {
            var canvas = document.getElementById("dotView");
            var context = canvas.getContext("2d");
            var e = window.event;
            var posX = e.clientX;
            var posY = e.clientY;
            var x = Math.floor((posX - canvas.offsetLeft) / (60 * sizeMod));
            var y = Math.floor((posY - canvas.offsetTop) / (60 * sizeMod));
            if (x === mostRecentX && y === mostRecentY) {
                return;
            } else
                dragClick();


        }
    }, false);


    document.getElementById("dotView").addEventListener("mousedown", function () {
        mouseDown = 1
    }, false);

    document.getElementById("dotView").addEventListener("mouseup", function () {
        mouseDown = 0
    }, false);
    //    document.getElementById("dotView").addEventListener("mousedown", leftClick, false);




}); //end of onready 





function leftClick() {
    var e = window.event;

    var posX = e.pageX;
    var posY = e.pageY;


    var canvas = document.getElementById("dotView");
    var context = canvas.getContext("2d");



    /*************
    **************
    Borrowed from MineSweeper project
    **************
    **************/
    var x = Math.floor((posX - canvas.offsetLeft) / (480 * sizeMod));
    var y = Math.floor((posY - canvas.offsetTop) / (480 * sizeMod));
    /***************
     ****************/

    mostRecentX = x;
    mostRecentY = y;

    dotArray[x][y] = color;
    draw();

    //    
    //    if (dotArray[x][y] === 1) {
    //        dotArray[x][y] = 0;
    //        draw();
    //        color = 0;
    //    } else {
    //        dotArray[x][y] = 1;
    //        draw();
    //        color = 1;
    //    }




}

function dragClick() {
    leftClick();
}



function rightClick() {

}

function drawGame() {

    sizeMod = .125;
    randomize();
    moreDots();
    randomize();
    moreDots();
    randomize();
    moreDots();
    randomize();


}



function draw() {

    var canvas = document.getElementById("dotView")
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < canvasSize; i + 0) {
        for (j = 0; j < 480; j + 0) {
            dotX = i / (480 * sizeMod);
            dotY = j / (480 * sizeMod);

            if (dotArray[dotX][dotY]) {
                drawBlackDot(i, j)
            } else {
                if (randomBin()) {
                    drawBlackDot(i, j);
                } else {
                    drawBlackSquare(i, j);
                }
            }

            //            if (dotArray[dotX][dotY] === 0) {
            //                drawYellowSquare(i, j);
            //            } else if (dotArray[dotX][dotY] === 1) {
            //                drawYellowDot(i, j);
            //            } else if (dotArray[dotX][dotY] === 2) {
            //                drawBlackSquare(i, j);
            //            } else if (dotArray[dotX][dotY] === 3) {
            //                drawBlackDot(i, j);
            //            }

            j += (480 * sizeMod);

        }
        i += (480 * sizeMod);
    }



}

function moreDots() {
    if (sizeMod === 0.0078125)
        return;

    sizeMod *= .5;

    var tempDotArray = new Array(dotArray.length * 2);

    for (var i = 0; i < dotArray.length; i++) {
        tempDotArray[i * 2] = new Array(dotArray[i].length * 2);
        tempDotArray[i * 2 + 1] = new Array(dotArray[i].length * 2);
        for (var j = 0; j < dotArray[i].length; j++) {
            tempDotArray[i * 2][j * 2] = dotArray[i][j];
            tempDotArray[i * 2][j * 2 + 1] = dotArray[i][j];
            tempDotArray[i * 2 + 1][j * 2] = dotArray[i][j];
            tempDotArray[i * 2 + 1][j * 2 + 1] = dotArray[i][j];


        }
    }
    dotArray = tempDotArray;
    draw();
}

function lessDots() {


    if (sizeMod >= 0.015625) {
        return;
    }
    sizeMod *= 2;

    var tempDotArray = new Array(dotArray.length / 2);

    for (var i = 0; i < dotArray.length / 2; i++) {
        tempDotArray[i] = new Array(dotArray[i].length / 2);
        for (var j = 0; j < tempDotArray[i].length; j++) {
            tempDotArray[i][j] = dotArray[i * 2 + 1][j * 2 + 1];
        }
    }
    dotArray = tempDotArray;
    draw();

}

function setBlack() {
    color = 0;
}

function setyellow() {
    color = 1;
}

function randomize() {
    for (var i = 0; i < dotArray.length; i++) {
        for (var j = 0; j < dotArray[i].length; j++) {
            if (j > 0) {
                    if (dotArray[i][j-1] = 0 && dotArray[i-1][j] === 0)
                        {
                            if (randomQuad() === 3)
                                {
                                    dotArray[i][j] = 1;
                                }
                            else{
                               if (randomBin())
                               {
                                   dotArray[i][j] = 0;
                               }
                                else{
                                    dotArray[i][j] = 1;
                                }
                            }
                        }
                    else if (dotArray[i][j - 1] === 0) {
                        if (randomQuad() === 3) {

                            dotArray[i][j] = 0;
                        } else {
                            dotArray[i][j] = randomBin();
                        }
                    } else {
                        dotArray[i][j] = randomBin();
                    }
                
            } else {
                if (i > 0) {
                    if (dotArray[i-1][j] === 0 ) {
                        if (randomQuad === 4)
                            {
                                dotArray[i][j] = 0;
                            }
                        else
                            {
                                dotArray[i][j] = randomBin();
                            }
                    }
                }
            }

        }
    }
    draw();



}

function randomBin() {
    var random = Math.random()
    if (random > .5) {
        return 1;
    } else {
        return 0;
    }

}

function randomQuad() {
    var random = Math.random()
    if (random > .75) {
        return 3;
    } else if (random > .5) {
        return 2;
    } else if (random > .25) {
        return 1;
    } else {
        return 0;
    }

}

function mildRand() {
    for (var i = 0; i < dotArray.length; i++) {
        for (var j = 0; j < dotArray[i].length; j++) {
            var random = Math.random();
            if (random > .9)
                dotArray[i][j] = randomBin();
        }
    }
    draw();


}

function allBlack() {
    for (var i = 0; i < dotArray.length; i++) {
        for (var j = 0; j < dotArray[i].length; j++) {
            
            dotArray[i][j] = 0;
        }
    }
    draw();
}

function allYellow() {

    for (var i = 0; i < dotArray.length; i++) {
        for (var j = 0; j < dotArray[i].length; j++) {

            dotArray[i][j] = 1;
        }
    }
    draw();
}


function invert() {
    for (var i = 0; i < dotArray.length; i++) {
        for (var j = 0; j < dotArray[i].length; j++) {
            if (dotArray[i][j] === 0) {
                dotArray[i][j] = 2;
            } else if (dotArray[i][j] === 1) {
                dotArray[i][j] = 3;
            } else if (dotArray[i][j] === 2) {
                dotArray[i][j] = 0;
            } else if (dotArray[i][j] === 3) {
                dotArray[i][j] = 1;
            }
        }
    }
    draw();
}

function explanation() {
    return "http://www.google.com";
}

//function drawYellowDot(i, j) {
//    var canvas = document.getElementById("dotView");
//    var context = canvas.getContext("2d");
//    var w = yellowDot.width * sizeMod;
//
//    var h = yellowDot.height * sizeMod;
// var random = Math.random();
//    if (randomBin)
//        {
//            random *= a;
//        }
//    else
//        {
//            random *= (-1*a);
//        }
//    context.drawImage(yellowDot, i+random, j+random, w, h);
//}

function drawBlackDot(i, j) {
    var canvas = document.getElementById("dotView");
    var context = canvas.getContext("2d");
    var w = blackDot.width * sizeMod;
    var h = blackDot.height * sizeMod;
    var random = Math.random();
    if (randomBin) {
        random *= a;
    } else {
        random *= (-1 * a);
    }
    var rando = randomSize();

    context.drawImage(blackDot, i + random, j + random, w * rando, h * rando);
}

function drawBlackSquare(i, j) {
    var canvas = document.getElementById("dotView");
    var context = canvas.getContext("2d");
    var random = Math.random();
    if (randomBin) {
        random *= a;
    } else {
        random *= (-1 * a);
    }
    var rando = randomSize();
    rando *= .85;
    var w = blackSquare.width * sizeMod;
    var h = blackSquare.height * sizeMod;
    context.drawImage(blackSquare, i + random, j + random, w * rando, h * rando);
}

//function drawYellowSquare(i, j) {
//    var canvas = document.getElementById("dotView");
//    var context = canvas.getContext("2d");
//    var w = yellowSquare.width * sizeMod;
//    var h = yellowSquare.height * sizeMod;
//   var random = Math.random();
//      if (randomBin)
//        {
//            random *= a;
//        }
//    else
//        {
//            random *= (-1*a);
//        }
//
//    context.drawImage(yellowSquare, i+random, j+random, w, h);
//}


function randomSize() {
    var rando = randomQuad();

    if (rando === 3) {
        return .88;
    } else if (rando === 2) {
        return .95;
    } else if (rando === 1) {
        return .99;
    } else {
        return 1;
    }
}
