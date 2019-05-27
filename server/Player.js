class Player {
    constructor(username) {
        this.username = username;
        this.isReady = false;
    }

    setReady() {
        this.isReady = true;
    }
}

export default Player;
