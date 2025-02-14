class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('fakeCar', './assets/fakeCar.jpg')
        this.load.image('fakeRock', './assets/fakeRock.jpg')
        this.load.image('road', './assets/road.png')
        this.load.image('car', './assets/car.jpg')
        this.load.image('rock', './assets/rock.png')
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.titleImg = this.add.sprite(640/2,480/2,'road')

    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('playScene')
        }
    }
}