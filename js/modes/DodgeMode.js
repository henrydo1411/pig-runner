
export class DodgeMode {
    constructor(pig, gameContainer) {
        this.pig = pig;
        this.gameContainer = gameContainer;

        this.speed = 350;
        this.positionX = parseFloat(getComputedStyle(this.pig.element).left) || 0;

        this.moveLeft = false;
        this.moveRight = false;
        this.isActive = false;
    }

    resetInput(){
        this.moveLeft = false;
        this.moveRight = false;
    }

    start() {
        this.isActive = true;
        this.resetInput();

        this.pig.changeAnimation("idle");
    }

    stop() {
        this.isActive = false;
        this.resetInput();

        this.pig.changeAnimation("idle");
    }

    keyDown(code) {
        if (!this.isActive) return;

        if (code === "ArrowLeft" || code === "KeyA") {
            this.moveLeft = true;
        }

        if (code === "ArrowRight" || code === "KeyD") {
            this.moveRight = true;
        }
    }

    keyUp(code) {
        if (code === "ArrowLeft" || code === "KeyA") {
            this.moveLeft = false;
        }

        if (code === "ArrowRight" || code === "KeyD") {
            this.moveRight = false;
        }
    }

    update(deltaTime) {
        if (!this.isActive) return;

        let direction = 0;

        if (this.moveLeft) direction -= 1;
        if (this.moveRight) direction += 1;

        this.positionX += direction * this.speed * deltaTime;
        const pigWidth = this.pig.element.offsetWidth * 0.6;
        const maxX = Math.max(
            0,
            this.gameContainer.clientWidth - pigWidth
        );

        this.positionX = Math.max(0, Math.min(this.positionX, maxX));

        this.pig.element.style.left = `${this.positionX}px`;

        if (direction < 0) {
            this.pig.setDirection("left");
            this.pig.changeAnimation("run");
        } else if (direction > 0) {
            this.pig.setDirection("right");
            this.pig.changeAnimation("run");
        } else {
            this.pig.changeAnimation("idle");
        }
    }

    resetPosition() {
        this.positionX = 50;
        this.pig.element.style.left = `${this.positionX}px`;
    }
    moveToCenter() {
        const pigWidth = this.pig.element.offsetWidth * 0.6;

        this.positionX = (this.gameContainer.clientWidth - pigWidth) / 2;

        this.pig.element.style.left = `${this.positionX}px`;

        this.pig.setDirection("right");
        this.pig.changeAnimation("idle");
    }

    
}
