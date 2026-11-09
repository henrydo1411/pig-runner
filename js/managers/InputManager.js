export class InputManager {
    constructor(game, pig, dodgeMode, pauseManager, canJump) {
        this.game = game;
        this.pig = pig;
        this.dodgeMode = dodgeMode;
        this.pauseManager = pauseManager;
        this.canJump = canJump;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    start() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
    }

    stop() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keyup", this.handleKeyUp);
    }

    handleKeyDown(event) {
        if (event.code === "Escape" && !event.repeat) {
            this.pauseManager.toggle();
            return;
        }

        if (event.code === "Space" && this.game.isPlaying() && this.canJump()) {
            event.preventDefault();
            this.pig.jump();
        }

        if (this.game.isMiniGame()) {
            if (["ArrowLeft", "ArrowRight", "KeyA", "KeyD"].includes(event.code)) {
                event.preventDefault();
            }

            this.dodgeMode.keyDown(event.code);
        }
    }

    handleKeyUp(event) {
        this.dodgeMode.keyUp(event.code);
    }
}