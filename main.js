// Project: Endless Runner
// Name: Jonathan Ng
// Game Title: Car Multitasking
// Approximate Hours: 15 Hrs 

'use strict'

const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.AUTO,
    width: 1900,
    height: 890,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Menu , Instructions, Play, Credit ]
}

const game = new Phaser.Game(config)

let keyENTER, keyLEFT, keyRIGHT 

