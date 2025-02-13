class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {

        this.ROCK_SPAWN_TIME = 1000
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
        this.rockArray = []
        this.character = new character(this, 0, this.game.config.height/2, 'fakeCar').setOrigin(0.5, 0.5)
        
        this.timer = this.time.addEvent({delay: this.ROCK_SPAWN_TIME, loop: true, callback: this.spawnRock, callbackScope: this})
        this.spawnRock()
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        this.character.update()
        for (let i = 0; i < this.rockArray.length; i++)
        {
            this.rockArray[i].update()
            this.checkCollision(this.character, this.rockArray[i])
        }
    }

    spawnRock() {
        this.randX = Math.round(Phaser.Math.Between(0,2))
        this.y = 0
        if(this.randX == 0) {
            this.randX = 0
        }
        else if(this.randX == 1) {
            this.randX = this.game.config.width/2
        }
        else if(this.randX == 2) {
            this.randX = this.game.config.width - 100
        }
        this.newRock = new rock(this, this.randX, this.y, 'fakeRock').setOrigin(0.5,0.5)
        console.log("rock spawned")
        this.rockArray.push(this.newRock)
    }

    checkCollision(char, rock) {
        // simple AABB checking 
        if( rock.x < char.x + char.width && 
            rock.x + rock.width > char.x && 
            rock.y < char.y + char.height && 
            rock.height + rock.y > char.y) {
            console.log("hit")
            return true
        } else {
            //console.log("not hit")
            return false
        }
    }

    changeSpeed(speed) {
        this.timer.delay = speed
    }
}