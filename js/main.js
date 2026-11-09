import { Pig } from "./entities/Pig.js";
import { Game } from "./core/Game.js";
import { ObstacleManager } from "./systems/ObstacleManager.js";
import { GameLoop } from "./core/GameLoop.js";
import { DifficultySystem } from "./systems/DifficultySystem.js";
import { MiniGameScheduler } from "./systems/MiniGameScheduler.js";
import { DodgeMode } from "./modes/DodgeMode.js";
import { MiniGameController } from "./core/MiniGameController.js";
import { FireballManager } from "./systems/FireballManager.js";
import { PauseManager } from "./managers/PauseManager.js";
import { InputManager } from "./managers/InputManager.js";
import { RunnerMode } from "./modes/RunnerMode.js";
import { UIManager } from "./managers/UIManager.js";
import { GameController } from "./core/GameController.js";
const dinosaur = document.getElementById("dinosaur");

const gameContainer = document.querySelector(".game");
const obstacleManager = new ObstacleManager(gameContainer);

const gameOverText = document.getElementById("gameOver");
const restartBtn = document.getElementById("restart");
const scoreText = document.getElementById("score");
const game = new Game(scoreText, gameOverText, restartBtn);
const pigHitBox = document.getElementById("hitbox");
const pig = new Pig(dinosaur, pigHitBox);
const dodgeMode = new DodgeMode(pig, gameContainer);
const pausedText = document.getElementById("pausedText");

const uiManager = new UIManager(pausedText);
const miniGameScheduler = new MiniGameScheduler();

const fireballManager = new FireballManager(gameContainer);

const miniGameTimer = document.getElementById("miniGameTimer");
const miniGameIntro = document.getElementById("miniGameIntro");
const miniGameCountdown = document.getElementById("miniGameCountdown");

const difficultySystem = new DifficultySystem();

const runnerMode = new RunnerMode(
    game,
    pig,
    obstacleManager,
    difficultySystem,
    miniGameScheduler
);



const ground = document.getElementById("ground");


const miniGameController = new MiniGameController(
    game,
    pig,
    dodgeMode,
    fireballManager,
    uiManager,
    {
        pausedText,
        timer: miniGameTimer,
        intro: miniGameIntro,
        countdown: miniGameCountdown
    }
);


const gameController = new GameController(
    game,
    pig,
    runnerMode,
    miniGameController,
    obstacleManager,
    difficultySystem,
    gameContainer,
    ground
);

const gameLoop = new GameLoop((deltaTime) => {
    gameController.update(deltaTime);
});
const pauseManager = new PauseManager(game, gameLoop, uiManager, dodgeMode);

const inputManager = new InputManager(
    game,
    pig,
    dodgeMode,
    pauseManager,
    () => runnerMode.canJump()
);

inputManager.start();

document.addEventListener("visibilitychange", () => {
    pauseManager.handleVisibilityChange();
});

gameLoop.start();

restartBtn.addEventListener("click", () => {
    location.reload();
})





