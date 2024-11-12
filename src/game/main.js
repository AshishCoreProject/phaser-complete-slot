import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';

import Phaser from 'phaser';
import { Preload } from './scenes/Preload';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
export const Config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    physics : {
        default : 'arcade',
        arcade : {
            debug : false
        }
    },
    fps : {
        min: 30,
        target: 60
    },
    scale: {
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CenterType,
        // autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#1b0044',
    scene: [
        
        Preload,
        Boot,
        Game,
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...Config, parent });

}

export default StartGame;
