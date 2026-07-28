import Phaser from "phaser";

export class TavernScene extends Phaser.Scene {
    constructor() {
        super("TavernScene");
    }

    preload() {
        this.load.image(
            "tavern-background",
            "/assets/tavern/tavern-background.png"
        );
    }

    create() {
        this.add.image(640, 360, "tavern-background");
    }

}