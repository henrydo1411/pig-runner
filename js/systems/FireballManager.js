import { Fireball } from "../entities/Fireball.js";

export class FireballManager {
    constructor(gameContainer) {
        this.gameContainer = gameContainer;
        this.fireballs = [];
        this.spawnTimer = 0;
        this.spawnInterval = 0.55;
        this.minSpawnInterval = 0.3;
        this.speed = 320;
        this.elapsedTime = 0;
        this.fireballSize = 200;
    }

    spawn() {
        const maxX = Math.max(
            0,
            this.gameContainer.clientWidth - this.fireballSize
        );

        const randomX = Math.random() * maxX;

        const fireball = new Fireball(
            this.gameContainer,
            randomX,
            this.speed
        );

        this.fireballs.push(fireball);
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;
        this.spawnTimer += deltaTime;

        this.spawnInterval = Math.max(
            this.minSpawnInterval,
            0.55 - this.elapsedTime * 0.01
        );

        this.speed = Math.min(
            480,
            320 + this.elapsedTime * 8
        );

        if (this.spawnTimer >= this.spawnInterval) {
            this.spawn();
            this.spawnTimer = 0;
        }

        for (let i = this.fireballs.length - 1; i >= 0; i--) {
            const fireball = this.fireballs[i];

            fireball.update(deltaTime);

            if (fireball.isOutOfScreen()) {
                fireball.remove();
                this.fireballs.splice(i, 1);
            }
        }
    }

    getFireballs() {
        return this.fireballs;
    }

    clear() {
        for (const fireball of this.fireballs) {
            fireball.remove();
        }

        this.fireballs = [];
        this.spawnTimer = 0;
        this.elapsedTime = 0;
        this.spawnInterval = 0.55;
        this.speed = 320;
    }
}