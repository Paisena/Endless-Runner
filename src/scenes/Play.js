class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {

        this.isRunning = true

        this.currentLetter = 0
        this.count = 1000
        this.score = 0

        this.ROCK_SPAWN_TIME = 3000
        this.WORD_SPAWN_TIME = 5000
        
        this.wordList = ["plane", "hi", "cow", "make", "half", "bard", "dock", "apple", "carrot"]

        this.wordPresent = []
        this.wordPresentTxt = []
        
        //this.starfield = this.add.image(0, 0, 1900, 980, 'road').setOrigin(0, 0)

        

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
        this.starfield = this.add.tileSprite(0, 0, 950, 980, 'road').setOrigin(0, 0)
        this.starfield.scaleX = 2
        
        let wordConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }
        this.wordUI = this.add.text(0 , 0, "word list:\n", wordConfig)
        this.scoreUI = this.add.text(this.game.config.width/2-250 , 0, "word list:\n", wordConfig)
        this.timerUI = this.add.text(this.game.config.width-500 , 0, "word list:\n", wordConfig)

        this.input.keyboard.on("keycombomatch",  (combo, event) => {
            console.log('Konami Code entered!')
            this.wordFound()            
            for (let i = 0; i < this.wordPresent.length; i++) {
                //console.log(this.wordPresent[i])
                
                if (combo.keyCodes == this.wordPresent[i].keyCodes) {
                    this.removeWord(i)
                }
            }
        });

        this.carNoise = this.sound.add('carNoise', {volume:0.4})
        this.carNoise.loop = true
        this.carNoise.play()

        this.music = this.sound.add('music', {volume:0.1})
        this.music.loop = true
        this.music.play()
        
        this.rockArray = []
        this.character = new character(this, 450, this.game.config.height-100, 'car').setOrigin(0.5, 0.5)
        this.character.scaleX = 2
        this.character.scaleY = 2
        
        this.timer = this.time.addEvent({delay: this.ROCK_SPAWN_TIME, loop: true, callback: this.spawnRock, callbackScope: this})
        this.wordTimer = this.time.addEvent({delay:this.WORD_SPAWN_TIME, loop: true, callback: this.createWord, callbackScope: this})
        this.spawnRock()
        this.createWord()
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update() {
        if(this.isRunning) {
            this.starfield.tilePositionY -= 4
            this.count -= 1
            //console.log(this.count)
            //console.log(`current at: ${this.wordPresent[i].current}`)
            this.textUpdate()
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
                if(this.checkCollision(this.character, this.rockArray[i])) {
                    this.endGame()
                }
            }

            if(this.count == 0) {
                this.endGame()
            }
        }
        else if (Phaser.Input.Keyboard.JustDown(keyENTER) && !this.isRunning) {
            console.log("play")
            this.music.stop()
            this.carNoise.stop()
            this.scene.start('creditScene')
        }
    }

    spawnRock() {
        if(this.isRunning) {
            this.randX = Math.round(Phaser.Math.Between(0,2))
            this.y = 0
            if(this.randX == 0) {
                this.randX = 500
            }
            else if(this.randX == 1) {
                this.randX = this.game.config.width/2
            }
            else if(this.randX == 2) {
                this.randX = this.game.config.width - 500
            }
            this.newRock = new rock(this, this.randX, this.y, 'rock').setOrigin(0.5,0.5)
            this.newRock.scaleX =2
            this.newRock.scaleY = 2
            this.rockArray.push(this.newRock)
        }
    }

    createWord() {
        if(this.isRunning) {
            this.whichWord = Math.floor(Math.random() * this.wordList.length)
            console.log(`type: ${this.wordList[this.whichWord]}`)

            this.newWord = this.input.keyboard.createCombo(this.wordList[this.whichWord])
            this.wordPresent.push(this.newWord)
            this.wordPresentTxt.push(this.wordList[this.whichWord])
            this.wordUI.text += `\n${this.wordList[this.whichWord]}`
        }
    }

    textUpdate() {
        this.wordUI.text = "Word:\n"
        for (let i = 0; i < this.wordPresent.length; i++) {
            this.wordUI.text += this.wordPresentTxt[i] + "\n"
        }

        this.scoreUI.text = "Score: " + this.score
        this.timerUI.text = "time: " + this.count
    }

    removeWord(index) {
        this.wordPresent.splice(index, 1)
        this.wordPresentTxt.splice(index, 1)
        //console.log(this.wordPresentTxt)
        //console.log("removed")
    }

    checkCollision(char, rock) {
        // simple AABB checking 
        console.log(`Char Y: ${char.y}`)
        console.log(`Char X: ${char.x}`)
        console.log(`rock Y: ${rock.y}`)
        console.log(`rock x: ${rock.x}`)
        if( rock.x < char.x + char.width && 
            rock.x + rock.width > char.x && 
            rock.y < char.y + char.height && 
            rock.height + rock.y > char.y ) {
            return true
        } else {
            console.log("not hit")
            return false
        }
    }

    changeSpeed(speed) {
        this.timer.delay = speed
        this.wordTimer.delay = speed
    }

    wordFound() {
        this.scoreSound = this.sound.add('score', {volume:0.1})
        this.scoreSound.play()
        this.count += 1000
        this.score += 1000
        this.checkNextLevel()
    }

    checkNextLevel() {
        if (this.score%10000 == 0 && (this.timer.delay-500 > 0 && this.wordTimer.delay-500 > 0)) {
            console.log("next level!")
            this.timer.delay -= 500
            this.wordTimer.delay -= 500
            console.log(this.timer.delay)
        }
    }

    endGame() {
        let wordConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }
        this.isRunning = false
        this.GGUI = this.add.text(this.game.config.width/2-250 , 100, "Game Over\nPress Enter to Continue", wordConfig)
        this.sfx = this.sound.add('crash', {volume:0.1})
        this.sfx.play()
    }
}