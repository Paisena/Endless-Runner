class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites

    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('playScene')
        }
    }
}