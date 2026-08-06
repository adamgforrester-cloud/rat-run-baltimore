import { Scene } from "phaser";

export class SplashScene extends Scene {
    constructor() {
        super("SplashScene");
    }

    init() {
        this.cameras.main.fadeIn(600, 0, 0, 0);
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 2 - 58, "RAT RUN", {
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: "64px",
            color: "#f2d16b",
            stroke: "#2a130c",
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 + 12, "BALTIMORE REMASTERED", {
            fontFamily: "Arial, sans-serif",
            fontSize: "24px",
            color: "#f4eee2",
            letterSpacing: 4
        }).setOrigin(0.5);

        this.add.text(width / 2, height - 88, "CLICK ANYWHERE TO BEGIN", {
            fontFamily: "Arial, sans-serif",
            fontSize: "18px",
            color: "#b9ad9d"
        }).setOrigin(0.5);

        this.input.once("pointerdown", () => {
            this.input.enabled = false;
            this.cameras.main.fadeOut(500, 0, 0, 0);
        });

        this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.start("MainScene");
        });
    }
}
