class Game {
    constructor() {

    }

    init () {
        this.gameWorld = new GameWorld();
    }

    start () {
        PoolGame.init();
        PoolGame.mainLoop();
    }

    mainLoop () {
        Canvas.clear();
        PoolGame.gameWorld.update();
        PoolGame.gameWorld.draw();
        Mouse.reset();

        requestAnimationFrame(PoolGame.mainLoop);
    }
}

const PoolGame = new Game();
