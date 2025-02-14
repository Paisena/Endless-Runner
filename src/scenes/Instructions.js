class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene")
    }

    create() {
        this.titleImg = this.add.sprite(1900/2,980/2,'instructions')
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            console.log("play")
            this.scene.start('playScene')
        }
    }
}