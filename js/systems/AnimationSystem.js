export class AnimationSystem {
    constructor(element) {
        this.element = element;

        this.animations = {
            run: { frame: 6, frameWidth: 220, loop: true },
            jump: { frame: 4, frameWidth: 220, loop: false },
            fall: { frame: 4, frameWidth: 220, loop: false },
            dead: { frame: 2, frameWidth: 220, loop: false },
            hurt: { frame: 3, frameWidth: 220, loop: false },
            idle: { frame: 4, frameWidth: 220, loop: true },
            land: { frame: 3, frameWidth: 220, loop: false }
        };

        this.currentAnimation = "run";
        this.currentFrame = 0;

        this.frameTimer = 0;
        this.frameDuration = 0.12;
    }

    changeAnimation(animation) {
        if (this.currentAnimation === animation) {
            return;
        }

        this.currentAnimation = animation;
        this.currentFrame = 0;
        this.frameTimer = 0;

        this.element.style.backgroundImage = `url("./spritesheet/${animation}.png")`;
        this.element.style.backgroundPositionX = "0px";
    }

    update(deltaTime) {
        this.frameTimer += deltaTime;

        while (this.frameTimer >= this.frameDuration) {
            this.frameTimer -= this.frameDuration;

            const config = this.animations[this.currentAnimation];

            if (config.loop) {
                this.currentFrame = (this.currentFrame + 1) % config.frame;
            } else if (this.currentFrame < config.frame - 1) {
                this.currentFrame++;
            }
        }

        const config = this.animations[this.currentAnimation];

        this.element.style.backgroundPositionX =
            `${-this.currentFrame * config.frameWidth}px`;
    }
}