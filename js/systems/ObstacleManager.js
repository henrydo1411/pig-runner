import { Obstacle } from "../entities/Obstacle.js";

export class ObstacleManager {
    constructor(gameContainer) {
        this.gameContainer = gameContainer;
        this.obstacles = [];
        this.speed = 250;

        this.obstacleTypes = [
            {
                name: "stump",
                width: 50,
                height: 45,
                image: "./images/obstacles/stump.png"
            },
            {
                name: "log",
                width: 55,
                height: 37,
                image: "./images/obstacles/log.png"
            },
            {
                name: "rock",
                width: 45,
                height: 45,
                image: "./images/obstacles/rock.png"
            },
            {
                name: "mushroom",
                width: 45,
                height: 40,
                image: "./images/obstacles/mushroom.png"
            }
        ];

        this.spawnTimer = 0;
        this.minSpawnInterval = 1.5;
        this.maxSpawnInterval = 3.2;
        this.spawnInterval = this.getRandomSpawnInterval();
        this.clusterChance = 0.25;
        this.clusterGapTime = 1.1;
    }

    spawnObstacle() {
        const randomIndex = Math.floor(Math.random() * this.obstacleTypes.length);

        const type = this.obstacleTypes[randomIndex];



        const obstacle = new Obstacle(this.gameContainer, type, this.gameContainer.clientWidth, this.speed);

        this.obstacles.push(obstacle);

        return obstacle;
    }

    spawnGroup() {
        const firstObstacle = this.spawnObstacle();

        if (Math.random() < this.clusterChance) {
            const gap = this.speed * this.clusterGapTime;

            const secondX =
                firstObstacle.x +
                firstObstacle.type.width +
                gap;

            this.spawnObstacle(secondX);
        }
    }

    getRandomSpawnInterval() {
        return this.minSpawnInterval +
            Math.random() * (this.maxSpawnInterval - this.minSpawnInterval);
    }

    update(deltaTime) {
        this.spawnTimer += deltaTime;

        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnObstacle();
            this.spawnTimer = 0;
            this.spawnInterval = this.getRandomSpawnInterval();
        }

        this.obstacles.forEach(obstacle => {
            obstacle.update(deltaTime);
        });

        this.obstacles = this.obstacles.filter(obstacle => {
            if (obstacle.isOffScreen()) {
                obstacle.remove();
                return false;
            }

            return true;
        });
    }

    getObstacles() {
        return this.obstacles;
    }
    setDifficulty(difficulty) {
        this.speed = difficulty.speed;
        this.minSpawnInterval = difficulty.minSpawnInterval;
        this.maxSpawnInterval = difficulty.maxSpawnInterval;

        this.spawnInterval = Math.max(
            this.minSpawnInterval,
            Math.min(this.spawnInterval, this.maxSpawnInterval)
        );

        this.obstacles.forEach(obstacle => {
            obstacle.speed = this.speed;
        });
    }
    
    clear() {
        this.obstacles.forEach(obstacle => {
            obstacle.remove();
        });

        this.obstacles = [];
        this.spawnTimer = 0;
        this.spawnInterval = this.getRandomSpawnInterval();
    }
}