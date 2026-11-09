
export class GameController {
    constructor(
        game,
        pig,
        runnerMode,
        miniGameController,
        obstacleManager,
        difficultySystem,
        gameContainer,
        ground
    ) {
        this.game = game;
        this.pig = pig;
        this.runnerMode = runnerMode;
        this.miniGameController = miniGameController;
        this.obstacleManager = obstacleManager;
        this.difficultySystem = difficultySystem;
        this.gameContainer = gameContainer;
        this.ground = ground;

        this.backgroundPosition = 0;
        this.backgroundSpeed = 50;
        this.groundPosition = 0;
    }

    update(deltaTime) {
        if (!this.game.isActive()) return;

        this.pig.updateAnimation(deltaTime);

        if (this.game.mode === "runner") {
            this.updateRunner(deltaTime);
        } else if (this.game.mode === "dodge") {
            this.updateDodge(deltaTime);
        }
    }

    updateRunner(deltaTime) {
        const shouldStartMiniGame = this.runnerMode.update(deltaTime);

        if (shouldStartMiniGame) {
            this.switchToDodge();
            return;
        }

        if (this.game.isPlaying()) {
            this.updateGround(deltaTime);
            this.updateBackground(deltaTime);
        }
    }

    updateDodge(deltaTime) {
        const isComplete = this.miniGameController.update(deltaTime);

        if (isComplete) {
            this.switchToRunner();
        }
    }

    switchToDodge() {
        this.runnerMode.exit();
        this.game.setMode("dodge", "intro");
        this.miniGameController.enter();
    }

    switchToRunner() {
        this.miniGameController.exit();
        this.game.setMode("runner", "running");
        this.runnerMode.enter();
    }

    updateBackground(deltaTime) {
        this.backgroundPosition -= this.backgroundSpeed * deltaTime;

        this.gameContainer.style.backgroundPositionX =
            `${this.backgroundPosition}px`;
    }

    updateGround(deltaTime) {
        const difficulty = this.difficultySystem.getDifficulty(this.game.score);

        this.groundPosition -= difficulty.speed * deltaTime;

        this.ground.style.backgroundPositionX =
            `${this.groundPosition}px`;
    }
}
