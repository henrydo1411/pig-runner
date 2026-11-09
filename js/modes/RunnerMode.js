
import { isColliding } from "../systems/CollisionSystem.js";

export class RunnerMode {
    constructor(game, pig, obstacleManager, difficultySystem, miniGameScheduler) {
        this.game = game;
        this.pig = pig;
        this.obstacleManager = obstacleManager;
        this.difficultySystem = difficultySystem;
        this.miniGameScheduler = miniGameScheduler;

        this.pendingMiniGame = false;
        this.landingDelay = 0;
    }

    enter() {
        this.pendingMiniGame = false;
        this.landingDelay = 0;
    }

    update(deltaTime) {
        if (!this.game.isPlaying()) return false;

        this.pig.update(deltaTime);
        this.obstacleManager.update(deltaTime);

        for (const obstacle of this.obstacleManager.getObstacles()) {
            const pigRect = this.pig.getHitbox();
            const obstacleRect = obstacle.getHitbox();

            if (isColliding(pigRect, obstacleRect)) {
                this.pig.die();
                this.game.gameOver();
                return false;
            }

            if (obstacleRect.right <= pigRect.left && !obstacle.hasScored) {
                this.game.addScore();
                obstacle.hasScored = true;

                const difficulty = this.difficultySystem.getDifficulty(this.game.score);
                this.obstacleManager.setDifficulty(difficulty);

                if (this.miniGameScheduler.shouldStart(this.game.score)) {
                    this.miniGameScheduler.advance();
                    this.pendingMiniGame = true;
                    this.landingDelay = 0.3;
                }
            }
        }

        if (
            this.pendingMiniGame &&
            !this.pig.isJumping &&
            this.pig.position <= this.pig.groundPosition
        ) {
            this.landingDelay -= deltaTime;

            if (this.landingDelay <= 0) {
                return true;
            }
        }

        return false;
    }

    exit() {
        this.obstacleManager.clear();
        this.pendingMiniGame = false;
        this.landingDelay = 0;
    }

    canJump() {
        return !this.pendingMiniGame;
    }
}
