class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('fakeCar', './assets/fakeCar.jpg')
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('playScene')
        }
    }
}