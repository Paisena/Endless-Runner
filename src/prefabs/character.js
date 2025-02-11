class character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        
        scene.add.existing(this)
        this.position = 1
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            switch (this.position) {
                case 1:
                    this.position = 0
                    this.updateCar()
                    console.log(this.position)
                    break;
                case 2:
                    this.position = 1
                    this.updateCar()
                    console.log(this.position)
                    break;
                default:
                    break;
            }
        }
        else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            switch (this.position) {
                case 1:
                    this.position = 2
                    this.updateCar()
                    console.log(this.position)
                    break;
                case 0:
                    this.position = 1
                    this.updateCar()
                    console.log(this.position)
                    break;
                default:
                    break;
            }
        }
    }
    updateCar() {
        switch (this.position) {
            case 0:
                console.log("changed to 0")
                this.x = 0
                this.y = this.scene.game.config.height/2 
                break;
            case 1:
                this.x = this.scene.game.config.width/2
                this.y = this.scene.game.config.height/2 
                break;
            case 2:
                this.x = this.scene.game.config.width - 100
                this.y = this.scene.game.config.height/2  
            default:
                break;
        }
    }
}