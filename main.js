// Project: Endless Runner
// Name: Jonathan Ng
// Game Title: TODODODODOODODODOD
// Approximate Hours: TODODODOODODODODO 
// Date: 2/10/2025

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
    scene: [ Menu , Play ]
}

const game = new Phaser.Game(config)

let keyENTER