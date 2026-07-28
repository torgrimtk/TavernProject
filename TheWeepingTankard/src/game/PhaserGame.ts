import Phaser from "phaser";
import { TavernScene } from "./scenes/TavernScene";

export function createPhaserGame(parent: string | HTMLElement) {
    return new Phaser.Game({
        type: Phaser.AUTO,

        width: 1280,
        height: 720,

        parent,

        scene: TavernScene
    });
}