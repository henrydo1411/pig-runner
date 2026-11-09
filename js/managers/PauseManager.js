export class PauseManager {
    constructor(game, gameLoop, uiManager, dodgeMode) {
        this.game = game;
        this.gameLoop = gameLoop;
        this.uiManager = uiManager;
        this.dodgeMode = dodgeMode;

        this.countdownTimer1 = null;
        this.countdownTimer2 = null;
    }

    pause() {
        if (!this.game.isActive()) return;

        this.game.pause();
        this.gameLoop.stop();
        this.dodgeMode.resetInput();

        this.uiManager.showTemporary("PAUSED");
    }

    resume() {
        if (!this.game.isPaused() || document.hidden) return;

        this.clearTimers();
        this.game.startResumeCountdown();

        this.uiManager.showTemporary("2");

        this.countdownTimer1 = setTimeout(() => {
            if (this.game.state !== "resuming") return;
            this.uiManager.showTemporary("1");
        }, 1000);

        this.countdownTimer2 = setTimeout(() => {
            if (document.hidden || this.game.state !== "resuming") return;

            this.game.resume();
            this.dodgeMode.resetInput();

            this.uiManager.restore();
            this.clearTimers();
            this.gameLoop.start();
        }, 2000);
    }

    toggle() {
        if (this.game.state === "resuming") {
            this.cancelResume();
            return;
        }

        if (this.game.isPaused()) {
            this.resume();
        } else {
            this.pause();
        }
    }

    cancelResume() {
        if (this.game.state !== "resuming") return;

        this.clearTimers();
        this.game.state = "paused";
        this.uiManager.showTemporary("PAUSED");
    }

    handleVisibilityChange() {
        if (!document.hidden) return;

        if (this.game.state === "resuming") {
            this.cancelResume();
            return;
        }

        this.pause();
    }

    clearTimers() {
        clearTimeout(this.countdownTimer1);
        clearTimeout(this.countdownTimer2);

        this.countdownTimer1 = null;
        this.countdownTimer2 = null;
    }
}