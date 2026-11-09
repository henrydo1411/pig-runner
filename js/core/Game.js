export class Game {
    constructor(scoreElement, gameOverElement, restartBtn) {
        this.scoreElement = scoreElement;
        this.gameOverElement = gameOverElement;
        this.restartBtn = restartBtn;

        this.score = 0;

        this.state = "playing";
        this.mode = "runner";
        this.phase = "running";

        this.updateScore();
    }

    pause() {
        if (this.state !== "playing") return;

        this.state = "paused";
    }

    isActive() {
    return this.state === "playing";
}

    startResumeCountdown() {
        if (this.state !== "paused") return;

        this.state = "resuming";
    }

    resume() {
        if (this.state !== "resuming") return;

        this.state = "playing";
    }

    gameOver() {
        if (this.state === "gameover") return;

        this.state = "gameover";

        this.gameOverElement.style.display = "block";
        this.restartBtn.style.display = "block";
    }

    updateScore() {
        this.scoreElement.textContent = `SCORE: ${this.score}`;
    }

    addScore() {
        if (!this.isPlaying()) return;

        this.score++;
        this.updateScore();
    }

    setMode(mode, phase) {
        this.mode = mode;
        this.phase = phase;
    }

    setPhase(phase) {
        this.phase = phase;
    }

    isPlaying() {
        return this.state === "playing" &&
            this.mode === "runner" &&
            this.phase === "running";
    }

    isMiniGame() {
        return this.state === "playing" &&
            this.mode === "dodge" &&
            this.phase === "active";
    }

    isPaused() {
        return this.state === "paused";
    }
}