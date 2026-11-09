export class UIManager {
    constructor(messageElement) {
        this.messageElement = messageElement;
        this.currentMessage = null;
    }

    show(message) {
        this.currentMessage = message;
        this.messageElement.textContent = message;
        this.messageElement.style.display = "block";
    }

    hide() {
        this.currentMessage = null;
        this.messageElement.style.display = "none";
    }

    showTemporary(message) {
        this.messageElement.textContent = message;
        this.messageElement.style.display = "block";
    }

    restore() {
        if (this.currentMessage !== null) {
            this.messageElement.textContent = this.currentMessage;
            this.messageElement.style.display = "block";
        } else {
            this.messageElement.style.display = "none";
        }
    }
}