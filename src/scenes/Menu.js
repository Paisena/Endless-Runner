class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('fakeCar', './assets/fakeCar.jpg')
        this.load.image('fakeRock', './assets/fakeRock.jpg')
        this.load.image('road', './assets/road.png')
        this.load.image('car', './assets/Car.png')
        this.load.image('rock', './assets/rock.png')
        this.load.image('title', './assets/Title.png')
        this.load.image('instructions', './assets/Instructions.png')
        this.load.image('credit', './assets/credit.png')

        // load sounds
        this.load.audio('skid', './assets/skid.wav')
        this.load.audio('crash', './assets/crash.wav')
        this.load.audio('score', './assets/score.mp3')
        this.load.audio('carNoise', './assets/carNoise.mp3')
        this.load.audio('music', './assets/music.mp3')
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.titleImg = this.add.sprite(1900/2,980/2,'title')

    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('instructionsScene')
        }
    }
}