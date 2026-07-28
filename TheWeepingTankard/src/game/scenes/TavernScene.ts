import Phaser from "phaser";

export class TavernScene extends Phaser.Scene {
    constructor() {
        super("TavernScene");
    }

    create() {
        this.add.text(100, 100, "The Weeping Tankard", {
            fontSize: "32px",
            color: "#ffffff"
        });
    }
}