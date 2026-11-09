import { AnimationSystem } from "../systems/AnimationSystem.js";

export class Pig {
    constructor(element, hitbox) {
        this.element = element;
        this.hitbox = hitbox;

        this.groundPosition = 10;
        this.position = this.groundPosition;

        this.velocity = 0;
        this.jumpStrength = 750;
        this.gravity = 2000;


        this.isJumping = false;
        this.isDead = false;

        this.animation = new AnimationSystem(this.element);

        this.element.style.bottom = `${this.position}px`;
    }

    jump() {
        if (this.isJumping || this.isDead) {
            return;
        }

        this.isJumping = true;
        this.velocity = this.jumpStrength;
        this.animation.changeAnimation("jump");

    }

    update(deltaTime) {


        if (this.isDead || !this.isJumping) {
            return;
        }

        this.velocity -= this.gravity * deltaTime;
        this.position += this.velocity * deltaTime;

        if (this.velocity < 0) {
            this.animation.changeAnimation("fall");
        }

        if (this.position <= this.groundPosition) {
            this.position = this.groundPosition;
            this.velocity = 0;
            this.isJumping = false;

            this.animation.changeAnimation("run");
        }

        this.element.style.bottom = `${this.position}px`;
    }



    die() {
        if (this.isDead) {
            return;
        }

        this.isDead = true;
        this.animation.changeAnimation("dead");
    }

    updateAnimation(deltaTime) {
        this.animation.update(deltaTime);
    }

    getHitbox() {
        return this.hitbox.getBoundingClientRect();
    }

    changeAnimation(name) {
        this.animation.changeAnimation(name);
    }

    setDirection(direction) {
        const scale = 0.6;

        if (direction === "left") {
            this.element.style.transform = `translateX(${this.element.offsetWidth * scale}px) scale(${-scale}, ${scale})`;
        } else {
            this.element.style.transform = `scale(${scale}, ${scale})`;
        }
    }
}