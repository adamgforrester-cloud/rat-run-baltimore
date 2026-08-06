import { Scene } from "phaser";

export class MainScene extends Scene {
    constructor() {
        super("MainScene");
    }

    init() {
        this.cameras.main.fadeIn(700, 0, 0, 0);
    }

    create() {
        const { width, height } = this.scale;
        const city = this.add.graphics();

        this.drawSky(city, width);
        this.drawSkyline(city);
        this.drawHarbor(city, width);
        this.drawStreet(city, width, height);
        this.drawStreetlight(105, 397);
        this.drawStreetlight(855, 397);

        this.add.text(28, 25, "BALTIMORE", {
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            color: "#b6a99b",
            letterSpacing: 4
        }).setAlpha(0.75);
    }

    drawSky(city, width) {
        city.fillStyle(0x101827);
        city.fillRect(0, 0, width, 310);
        city.fillStyle(0x253550, 0.9);
        city.fillRect(0, 88, width, 222);
        city.fillStyle(0xd07a67, 0.14);
        city.fillRect(0, 205, width, 105);
    }

    drawSkyline(city) {
        const buildings = [
            [0, 165, 96, 145], [83, 128, 83, 182], [151, 181, 105, 129],
            [237, 108, 92, 202], [313, 151, 72, 159], [368, 84, 114, 226],
            [467, 143, 89, 167], [541, 120, 129, 190], [653, 166, 91, 144],
            [728, 98, 106, 212], [818, 146, 142, 164]
        ];

        buildings.forEach(([x, y, buildingWidth, buildingHeight], index) => {
            city.fillStyle(index % 2 === 0 ? 0x211f2b : 0x292430);
            city.fillRect(x, y, buildingWidth, buildingHeight);

            city.fillStyle(0xd8aa59, 0.45);
            for (let windowY = y + 18; windowY < y + buildingHeight - 12; windowY += 29) {
                for (let windowX = x + 14; windowX < x + buildingWidth - 10; windowX += 25) {
                    if ((windowX + windowY + index) % 4 !== 0) {
                        city.fillRect(windowX, windowY, 7, 10);
                    }
                }
            }
        });

        city.fillStyle(0x17151f);
        city.fillTriangle(250, 108, 283, 72, 316, 108);
        city.fillRect(399, 57, 50, 27);
        city.fillRect(418, 31, 12, 26);
        city.fillRect(759, 70, 42, 28);
        city.fillRect(774, 42, 12, 28);

        // A small red waterfront landmark glow, inspired by Baltimore's industrial harbor.
        city.fillStyle(0x8f261f);
        city.fillRect(34, 188, 92, 34);
        this.add.text(80, 204, "SUGAR", {
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: "12px",
            color: "#ff6b55",
            letterSpacing: 2
        }).setOrigin(0.5);
    }

    drawHarbor(city, width) {
        city.fillStyle(0x18384c);
        city.fillRect(0, 278, width, 76);
        city.fillStyle(0x246078, 0.65);
        city.fillRect(0, 306, width, 48);

        // Broken vertical reflections from the illuminated skyline.
        const reflections = [
            [70, 0xf06b50, 18], [184, 0xe0b65c, 28], [296, 0x67b8c7, 16],
            [420, 0xe1a653, 32], [565, 0x5aaec5, 22], [707, 0xe37a59, 27],
            [864, 0xf2c86b, 20]
        ];
        reflections.forEach(([x, color, reflectionWidth], index) => {
            city.fillStyle(color, 0.18);
            city.fillTriangle(x, 282, x + reflectionWidth, 282, x + reflectionWidth * 1.5, 350);
            city.fillStyle(color, 0.24);
            for (let y = 294 + index % 3; y < 350; y += 12) {
                city.fillRect(x - 5, y, reflectionWidth + 14, 2);
            }
        });

        // Marina docks, slips, and a few simple boat silhouettes.
        city.lineStyle(2, 0xb9c6c6, 0.6);
        city.lineBetween(560, 319, 940, 319);
        for (let x = 580; x < 940; x += 52) {
            city.lineBetween(x, 319, x, 345);
        }
        city.fillStyle(0xe6e0d5, 0.85);
        city.fillTriangle(610, 312, 635, 312, 623, 301);
        city.fillRect(608, 312, 30, 5);
        city.fillTriangle(770, 335, 800, 335, 785, 322);
        city.fillRect(767, 335, 36, 5);

        city.lineStyle(1, 0xd5d8d2, 0.55);
        city.lineBetween(623, 301, 623, 281);
        city.lineBetween(785, 322, 785, 292);
    }

    drawStreet(city, width, height) {
        // Inner Harbor's brick promenade.
        city.fillStyle(0x8e5546);
        city.fillRect(0, 354, width, 58);
        city.fillStyle(0xb9785f);
        city.fillRect(0, 354, width, 6);
        city.lineStyle(1, 0x673d38, 0.7);
        for (let y = 366; y < 412; y += 12) {
            city.lineBetween(0, y, width, y);
        }
        for (let x = 0; x <= width; x += 46) {
            city.lineBetween(x, 354, x - 12, 412);
        }

        city.fillStyle(0xb5a68e);
        city.fillRect(0, 412, width, 8);
        city.fillStyle(0x39373f);
        city.fillRect(0, 420, width, height - 420);

        city.fillStyle(0xd6b65d, 0.7);
        for (let x = 35; x < width; x += 150) {
            city.fillRect(x, 500, 82, 5);
        }

        city.fillStyle(0x24232a);
        city.fillEllipse(width * 0.67, 463, 72, 25);
        city.lineStyle(2, 0x59565d);
        city.strokeEllipse(width * 0.67, 463, 60, 19);
        city.lineBetween(width * 0.67 - 22, 463, width * 0.67 + 22, 463);
    }

    drawStreetlight(x, groundY) {
        const lamp = this.add.graphics();
        lamp.lineStyle(7, 0x25242b);
        lamp.lineBetween(x, groundY, x, groundY - 125);
        lamp.lineBetween(x, groundY - 125, x + 24, groundY - 125);
        lamp.fillStyle(0x25242b);
        lamp.fillRoundedRect(x + 14, groundY - 136, 31, 23, 4);
        lamp.fillStyle(0xf1c86a, 0.9);
        lamp.fillRect(x + 20, groundY - 130, 19, 10);
        lamp.fillStyle(0xf1c86a, 0.08);
        lamp.fillTriangle(x + 17, groundY - 113, x + 42, groundY - 113, x + 72, groundY);
    }
}
