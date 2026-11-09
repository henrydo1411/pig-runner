export class Obstacle {
    constructor(gameContainer, type, x, speed) {
        this.gameContainer = gameContainer;
        this.type = type;
        this.x = x;
        this.speed = speed;
        this.hasScored = false;

        this.element = document.createElement("div");
        this.element.className = "obstacle";

        this.element.style.width = `${type.width}px`;
        this.element.style.height = `${type.height}px`;
        this.element.style.bottom = "22px";
        this.element.style.left = `${this.x}px`;
        this.element.style.backgroundImage = `url("${type.image}")`;

        this.gameContainer.appendChild(this.element);
    }

    update(deltaTime) {
        this.x -= this.speed * deltaTime;
        this.element.style.left = `${this.x}px`;
    }

    getHitbox() {
        return this.element.getBoundingClientRect();
    }

    isOffScreen() {
        return this.x + this.type.width < 0;
    }

    remove() {
        this.element.remove();
    }
}