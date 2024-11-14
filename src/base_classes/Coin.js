import {Config} from '../../src/game/main';
import Options from '../options';
import Sprite from './Sprite';
//Class Coin
export default class Coin {
    constructor(scene) {
        this.scene = scene;
        this.addCoin();
        this.MinusCoin();
    }

    addCoin() {
        // this.coin = new Sprite(this.scene, Config.width - 665, Config.height - 68, 'bgButtons', 'btn-coin.png');
        // this.coin.setVisible(false);
        // this.coin.scale = 0.79;
        this.coin = new Sprite(this.scene, Config.width - 760, Config.height - 67, 'bgButtons', 'plus_button.png');
        this.coinPlusClick = new Sprite(this.scene, Config.width - 760, Config.height - 67, 'bgButtons','plus_button_click.png');
        this.coinPlusClick.setVisible(false);

        this.txtCoin = this.scene.add.dynamicBitmapText(Config.width - 720, Config.height - 70, 'txt_bitmap', Options.txtCoin, 38);
        this.txtCoin.setDisplayCallback(this.scene.textCallback);
        this.txtCountCoin = this.scene.add.text(Config.width - 1070, Config.height - 620, 'Coin: ' + Options.coin, {
            fontSize : '30px',
            color : '#fff400',
            fontFamily : 'Montserrat',
        });
        this.txtCountCoin.setVisible(false);

        //pointer down
        this.coin.on('pointerdown', this.IncreaseCoin, this);
        //pointer up
        this.coin.on('pointerout', () => {
            this.coin.setVisible(true);
            this.coinPlusClick.setVisible(false);
        });
    }

    MinusCoin(){
        this.coinMinus = new Sprite(this.scene, Config.width - 920, Config.height - 67, 'bgButtons', '-button.png');

        this.coinMinusClick = new Sprite(this.scene, Config.width - 920 , Config.height - 67, 'bgButtons', '-button_click.png');
        this.coinMinusClick.setVisible(false);

        //pointer down
        this.coinMinus.on('pointerdown', this.DecreaseCoin, this);
        //pointer up 
        this.coinMinus.on('pointerout', () => {
            this.coinMinus.setVisible(true);
            this.coinMinusClick.setVisible(false);
        })
    }

    IncreaseCoin() {
        if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {
            this.coin.setScale(1);

            //handling animation of button
            if(Options.coin < 50){
                this.coin.setVisible(false);
                this.coinPlusClick.setVisible(true);
            }

            //play audio button
            this.scene.audioPlayButton();
            if (Options.coin < 50) {
                Options.coin += 10;
                this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText(Options.coin * Options.line);
            } else {
                // Options.coin = 10;
                // this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText(Options.coin * Options.line);
            }
        }
    }
    DecreaseCoin(){
        if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {
            this.coin.setScale(1);

            //handling animation of button
            if(Options.coin > 10){
                this.coinMinus.setVisible(false);
                this.coinMinusClick.setVisible(true);
            }

            //play audio button
            this.scene.audioPlayButton();
            if (Options.coin > 10) {
                Options.coin -= 10;
                this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText( Options.coin * Options.line);
            } else {
                // Options.coin = 50;
                // this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText(Options.coin * Options.line);
            }
        }
    }
    
}