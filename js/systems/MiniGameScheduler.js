export class MiniGameScheduler {
    constructor() {
        this.intervals = [10, 10, 15, 20];
        this.index = 0;
        this.nextMiniGameScore = 5;
    }

    shouldStart(score) {
        return score >= this.nextMiniGameScore;
    }

    advance() {
        this.nextMiniGameScore += this.intervals[this.index];
        this.index = (this.index + 1) % this.intervals.length;
    }
}