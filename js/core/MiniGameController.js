
import { isCircleCollidingWithRect } from "../systems/CollisionSystem.js";

export class MiniGameController {
    constructor(game, pig, dodgeMode, fireballManager, uiManager, elements) {
        this.game = game;
        this.pig = pig;
        this.dodgeMode = dodgeMode;
        this.fireballManager = fireballManager;
        this.uiManager = uiManager;

        this.timerElement = elements.timer;
        this.introElement = elements.intro;
        this.countdownElement = elements.countdown;

        this.introTime = 3;
        this.gameTime = 15;
        this.completeTime = 2;
        this.hitTime = 0;
    }

    enter() {
        this.dodgeMode.stop();
        this.dodgeMode.moveToCenter();

        this.introTime = 3;
        this.gameTime = 15;
        this.completeTime = 2;
        this.hitTime = 0;

        this.fireballManager.clear();
        this.uiManager.hide();

        this.timerElement.style.display = "none";
        this.introElement.style.display = "block";
        this.countdownElement.textContent = "3";
    }

    update(deltaTime) {
        if (!this.game.isActive() || this.game.mode !== "dodge") {
            return false;
        }

        switch (this.game.phase) {
            case "intro":
                this.updateIntro(deltaTime);
                break;

            case "active":
                this.updateMiniGame(deltaTime);
                break;

            case "hit":
                this.updateHit(deltaTime);
                break;

            case "dead":
                this.updateDead(deltaTime);
                break;

            case "complete":
                return this.updateComplete(deltaTime);
        }

        return false;
    }

    updateIntro(deltaTime) {
        this.introTime = Math.max(0, this.introTime - deltaTime);
        this.countdownElement.textContent = Math.ceil(this.introTime);

        if (this.introTime <= 0) {
            this.introElement.style.display = "none";
            this.game.setPhase("active");
            this.timerElement.style.display = "block";

            this.fireballManager.clear();
            this.dodgeMode.start();
        }
    }

    updateMiniGame(deltaTime) {
        this.dodgeMode.update(deltaTime);
        this.fireballManager.update(deltaTime);

        const pigRect = this.pig.getHitbox();

        for (const fireball of this.fireballManager.getFireballs()) {
            const circle = fireball.getCircle();

            if (isCircleCollidingWithRect(circle, pigRect)) {
                this.fireballManager.clear();
                this.dodgeMode.stop();

                this.game.setPhase("hit");
                this.hitTime = 0.4;

                this.pig.changeAnimation("hurt");
                this.timerElement.style.display = "none";
                return;
            }
        }

        this.gameTime = Math.max(0, this.gameTime - deltaTime);

        this.timerElement.textContent =
            `00:${String(Math.ceil(this.gameTime)).padStart(2, "0")}`;

        if (this.gameTime <= 0) {
            this.fireballManager.clear();
            this.dodgeMode.stop();

            this.game.setPhase("complete");
            this.completeTime = 2;

            this.timerElement.style.display = "none";
            this.uiManager.show("MINI GAME COMPLETE");
        }
    }

    updateHit(deltaTime) {
        this.hitTime -= deltaTime;

        if (this.hitTime <= 0) {
            this.pig.die();
            this.game.setPhase("dead");
            this.hitTime = 0.6;
        }
    }

    updateDead(deltaTime) {
        this.hitTime -= deltaTime;

        if (this.hitTime <= 0) {
            this.game.gameOver();
        }
    }

    updateComplete(deltaTime) {
        this.completeTime -= deltaTime;
        return this.completeTime <= 0;
    }

    exit() {
        this.fireballManager.clear();
        this.dodgeMode.stop();
        this.dodgeMode.resetPosition();

        this.pig.setDirection("right");
        this.pig.changeAnimation("run");

        this.timerElement.style.display = "none";
        this.introElement.style.display = "none";
        this.uiManager.hide();
    }
}
