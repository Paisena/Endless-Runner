class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        console.log("play started")

        this.add.rectangle(0, 0, this.game.config.width,this.game.config.width, 0x00FF00).setOrigin(0,0)
        this.plane = this.input.keyboard.createCombo("plane", {
            enabled:false
        })
        this.input.keyboard.createCombo("pine")
        
        this.input.keyboard.on("keycombomatch",  (combo, event) => {
            console.log('Konami Code entered!');

            if(combo === this.plane) {
                console.log("plane")
                console.log(this.plane.matched)
            }
            this.plane.enabled = true;
        });

        this.character = new character(this, this.game.config.width/2, this.game.config.height/2, 'fakeCar').setOrigin(0.5, 0.5)
    
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

    }

    update() {
        this.character.update()
    }
}