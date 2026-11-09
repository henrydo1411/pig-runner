export class GameLoop {
    constructor(update) {
        this.update = update;
        this.lastTime = null;
        this.isRunning = false;
        this.frameId = null;

        this.loop = this.loop.bind(this);
    }

    start() {
        if (this.isRunning) {
            return;
        }

        this.isRunning = true;
        this.lastTime = null;
        this.frameId = requestAnimationFrame(this.loop);
    }

    loop(timestamp) {
        if (!this.isRunning) {
            return;
        }

        if (this.lastTime === null) {
            this.lastTime = timestamp;
        }

        const deltaTime = Math.min(
            (timestamp - this.lastTime) / 1000,
            0.05
        );

        this.lastTime = timestamp;

        this.update(deltaTime);

        if (this.isRunning) {
            this.frameId = requestAnimationFrame(this.loop);
        }
    }

    stop() {
        this.isRunning = false;

        if (this.frameId !== null) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }

        this.lastTime = null;
    }
}