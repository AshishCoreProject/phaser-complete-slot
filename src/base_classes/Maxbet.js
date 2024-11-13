import {Config} from '../../src/game/main';
import Options from '../options';
import Sprite from './Sprite';
//Class Maxbet
export default class Maxbet {
    constructor(scene) {
        this.scene = scene;
        this.addMaxbet();
    }

    addMaxbet() {
        this.maxBet = new Sprite(this.scene, Config.width - 437, Config.height - 68, 'bgButtons', 'btn-maxbet.png');
        this.maxBet.scale = 1

        this.maxBetPress = new Sprite(this.scene, Config.width - 437, Config.height - 68, 'bgButtons', 'btn-maxbet_click.png');
        this.maxBetPress.setVisible(false);

        this.txtMaxBet = this.scene.add.dynamicBitmapText(Config.width - 550, Config.height - 70, 'txt_bitmap', Options.txtMaxBet, 38);
        this.txtMaxBet.setDisplayCallback(this.scene.textCallback);
        this.txtCountMaxBet = this.scene.add.text(Config.width - 355, Config.height - 620, 'BET: ' + Options.coin * Options.line, {
            fontSize : '30px',
            color : '#fff400',
            fontFamily : 'PT Serif'
        });

        this.maxBet.setInteractive();
        this.maxBet.on('pointerdown', this.onMaxbetDown, this);
        this.maxBet.on('pointerup', this.onMaxbetUp, this);
        this.maxBet.on('pointerout', this.onMaxbetOut, this);
    }

    onMaxbetDown() {
        if (!Options.checkClick && Options.line * Options.coin
            < 1000 && Options.txtAutoSpin === 'AUTO') {

            this.maxBet.setVisible(false);
            this.maxBetPress.setVisible(true);
            this.maxBetPress.setScale(1)

            //play audio button
            this.scene.audioPlayButton();
            Options.line = 20;
            this.scene.btnLine.txtCountLine.setText(Options.line);
            Options.coin = 50;
            this.scene.coin.txtCountCoin.setText( 'Coin: ' + Options.coin);
            this.txtCountMaxBet.setText('BET: ' + Options.line * Options.coin);
        }
    }

    // call When button is released.
    onMaxbetUp(){
        this.maxBet.setVisible(true);
        this.maxBetPress.setVisible(false);
    }

    // call when pointer leaves the button area.
    onMaxbetOut(){
        this.maxBet.setVisible(true);
        this.maxBetPress.setVisible(false);
    }
}