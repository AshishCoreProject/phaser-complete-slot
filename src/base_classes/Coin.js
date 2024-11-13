import {Config} from '../../src/game/main';
import Options from '../options';
import Sprite from './Sprite';
//Class Coin
export default class Coin {
    constructor(scene) {
        this.scene = scene;
        this.addCoin();
    }

    addCoin() {
        this.coin = new Sprite(this.scene, Config.width - 665, Config.height - 68, 'bgButtons', 'btn-coin.png');
        this.coin.setVisible(false);
        this.coin.scale = 0.79;
        this.txtCoin = this.scene.add.dynamicBitmapText(Config.width - 720, Config.height - 70, 'txt_bitmap', Options.txtCoin, 38);
        this.txtCoin.setDisplayCallback(this.scene.textCallback);
        this.txtCountCoin = this.scene.add.text(Config.width - 1070, Config.height - 620, 'Coin: ' + Options.coin, {
            fontSize : '30px',
            color : '#fff400',
            fontFamily : 'PT Serif',
        });
        //pointer down
        this.coin.on('pointerdown', this.onCoin, this);
        //pointer up
        this.coin.on('pointerup', () => this.coin.setScale(0.75));
    }

    onCoin() {
        if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {
            this.coin.setScale(0.7);
            //play audio button
            this.scene.audioPlayButton();
            if (Options.coin < 50) {
                Options.coin += 10;
                this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText('BET: ' + Options.coin * Options.line);
            } else {
                Options.coin = 10;
                this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText('BET: ' + Options.coin * Options.line);
            }
        }
    }
}