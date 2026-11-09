export class Fireball {
    constructor(gameContainer, x, speed = 250) {
        this.gameContainer = gameContainer;
        this.x = x;

        this.speed = speed;
        this.size = 200;
        this.y = -this.size;

        this.element = document.createElement("div");
        this.element.className = "fireball";

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        this.gameContainer.appendChild(this.element);
    }

    update(deltaTime) {
        this.y += this.speed * deltaTime;
        this.element.style.top = `${this.y}px`;
    }

    isOutOfScreen() {
        return this.y > this.gameContainer.clientHeight;
    }

    getHitbox() {
        return this.element.getBoundingClientRect();
    }

    remove() {
        this.element.remove();
    }
    getCircle() {
        const rect = this.element.getBoundingClientRect();

        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            radius: Math.min(rect.width, rect.height) / 2
        };
    }
}