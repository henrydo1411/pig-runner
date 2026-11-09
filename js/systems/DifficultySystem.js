
export class DifficultySystem {
    constructor() {
        this.baseSpeed = 250;
        this.speedIncrease = 15;
        this.scorePerLevel = 5;

        this.baseMinSpawnInterval = 1.5;
        this.baseMaxSpawnInterval = 2.5;
        this.intervalDecrease = 0.15;
    }

    getDifficulty(score) {
        const level = Math.floor(score / this.scorePerLevel);

        const speed = this.baseSpeed + level * this.speedIncrease;

        const minSpawnInterval = Math.max(
            1.0,
            this.baseMinSpawnInterval - level * this.intervalDecrease
        );

        const maxSpawnInterval = Math.max(
            1.5,
            this.baseMaxSpawnInterval - level * this.intervalDecrease
        );

        return {
            speed,
            minSpawnInterval,
            maxSpawnInterval
        };
    }
}
