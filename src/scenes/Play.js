class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {

        this.currentLetter = 0

        this.ROCK_SPAWN_TIME = 1000
        this.WORD_SPAWN_TIME = 5000
        
        this.wordList = ["plane", "hi", "cow", "make", "half"]

        this.wordPresent = []
        
        console.log("play started")
        this.input.keyboard.on("keydown", event => {
            if(event.keyCode == 37) {
                for (let i = 0; i < this.wordPresent.length; i++) {
                    if (this.wordPresent[i].index != 0)
                    {
                        console.log("caught")
                        this.currentLetter = this.wordPresent[i].current
                        this.wordPresent[i].enabled = false
                        console.log(this.currentLetter)
                    }
                }
            }
            else if(event.keyCode == 39) {
                for (let i = 0; i < this.wordPresent.length; i++) {
                    if (this.wordPresent[i].index != 0)
                    {
                        console.log("caught")
                        this.currentLetter = this.wordPresent[i].current
                        this.wordPresent[i].enabled = false
                        console.log(this.currentLetter)
                    }
                }
            }

        })
        this.add.rectangle(0, 0, this.game.config.width,this.game.config.width, 0x00FF00).setOrigin(0,0)
        this.plane = this.input.keyboard.createCombo("plane", {
            loop:true,
            resetOnMatch:true,
        })
        this.input.keyboard.createCombo("pine")

        

        this.input.keyboard.on("keycombomatch",  (combo, event) => {
            console.log('Konami Code entered!');

            // if(combo === this.plane) {
            //     console.log("plane")
            //     console.log(this.plane.matched)
            // }
            this.plane.enabled = true;
        });

        
        
        this.rockArray = []
        this.character = new character(this, 0, this.game.config.height/2, 'fakeCar').setOrigin(0.5, 0.5)
        
        this.timer = this.time.addEvent({delay: this.ROCK_SPAWN_TIME, loop: true, callback: this.spawnRock, callbackScope: this})
        this.wordTimer = this.time.addEvent({delay:this.WORD_SPAWN_TIME, loop: true, callback: this.createWord, callbackScope: this})
        this.spawnRock()
        this.createWord()
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        //console.log(`current at: ${this.wordPresent[i].current}`)
        if(Phaser.Input.Keyboard.JustUp(keyLEFT)) {
            //console.log("plane enabled")
            for (let i = 0; i < this.wordPresent.length; i++) {
                if (this.wordPresent[i].enabled == false)
                {
                    
                    this.wordPresent[i].enabled = true
                    this.wordPresent[i].current = this.currentLetter
                    console.log(`currentLetter at ${this.currentLetter}`)
                }
            }
            
        }

        if(Phaser.Input.Keyboard.JustUp(keyRIGHT)) {
            //console.log("plane enabled")
            for (let i = 0; i < this.wordPresent.length; i++) {
                if (this.wordPresent[i].enabled == false)
                {
                    
                    this.wordPresent[i].enabled = true
                    this.wordPresent[i].current = this.currentLetter
                    console.log(`currentLetter at ${this.currentLetter}`)
                }
            }
            
        }
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
        this.rockArray.push(this.newRock)
    }

    createWord() {
        this.whichWord = Math.floor(Math.random() * this.wordList.length)
        console.log(`type: ${this.wordList[this.whichWord]}`)

        this.newWord = this.input.keyboard.createCombo(this.wordList[this.whichWord])
        this.wordPresent.push(this.newWord)
    }

    checkCollision(char, rock) {
        // simple AABB checking 
        if( rock.x < char.x + char.width && 
            rock.x + rock.width > char.x && 
            rock.y < char.y + char.height && 
            rock.height + rock.y > char.y) {
            return true
        } else {
            //console.log("not hit")
            return false
        }
    }

    changeSpeed(speed) {
        this.timer.delay = speed
        this.wordTimer.delay = speed
    }
}