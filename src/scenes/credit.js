class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }

    create() {
        this.titleImg = this.add.sprite(1900/2,980/2,'credit')
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            console.log("play")
            this.scene.start('playScene')
        }
    }
}