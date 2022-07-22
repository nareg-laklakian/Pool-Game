const sprites = {};
let assetsStillLoading = 0;

function assetsLoadingLoop (callback) {
    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    } else {
        callback();
    }
}

function loadSprite(fileName) {
    assetsStillLoading++;
    const spriteImage = new Image();
    spriteImage.src = ".\\assets\\" + fileName;

    spriteImage.onload = function () {
        assetsStillLoading--;
    }

    return spriteImage;
}

function loadAssets (callback) {
    // loading assets
    sprites.background = loadSprite('spr_background.png');
    sprites.stick = loadSprite('spr_stick.png');
    sprites.whiteBall = loadSprite('spr_ball_white.png');
    sprites.redBall = loadSprite('spr_ball_red.png');
    sprites.yellowBall = loadSprite('spr_ball_yellow.png');
    sprites.blackBall = loadSprite('spr_ball_black.png');

    assetsLoadingLoop(callback);
}

function getBallSpriteByColor (color) {
    switch (color) {
        case Color.red:
            return sprites.redBall;
        case Color.yellow:
            return sprites.yellowBall;
        case Color.black:
            return sprites.blackBall;
        case Color.white:
            return sprites.whiteBall;
    }
}

const Color = {
    red: 1,
    yellow: 2,
    black: 3,
    white: 4
}
