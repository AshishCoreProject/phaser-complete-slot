import {Config} from '../../src/game/main';
import Options from '../options';
//import Class
import Sprite from './Sprite';
import Tween from './Tween';
//Class Base Spin
export default class BaseSpin {
    constructor(scene) {
        this.scene = scene;
        this.addSpin();
        this.totalWin();
    }

    addSpin() {
        this.bgSpin = new Sprite(this.scene, Config.width - 305, Config.height - 68, 'bgButtons', 'btn-spin.png');
        this.bgSpinClick = new Sprite(this.scene, Config.width - 305, Config.height - 68, 'bgButtons', 'spin_button_click.png');

        this.bgSpinClick.setVisible(false);

        //text spin
        this.txtSpin = this.scene.add.dynamicBitmapText(Config.width - 315, Config.height - 70, 'txt_bitmap', Options.txtSpin, 38);
        this.txtSpin.setDisplayCallback(this.scene.textCallback);
        this.bgSpin.on('pointerdown', this.playTweens, this);
        this.bgSpin.on('pointerout', () => {
            this.bgSpin.setScale(1);
            this.bgSpin.setVisible(true);
            this.bgSpinClick.setVisible(false);
        });
        
    }
    totalWin(){
        this.totalWin = new Sprite(this.scene, Config.width - 600, Config.height - 68, 'bgButtons', 'totalwin.png');
        this.totalWin.scale = 1;
    }

    playTweens() {
        if (!Options.checkClick && this.scene.valueMoney >=
            (Options.coin * Options.line) && Options.txtAutoSpin === 'AUTO') {
            //button click animation
            this.bgSpin.setVisible(false);
            this.bgSpinClick.setVisible(true);
            //detroy line array
            this.destroyLineArr();
            //setTint
            this.setColor();
            Options.checkClick = true;
            this.bgSpin.setScale(0.9);
            //funtion remove text win
            this.removeTextWin();
            //save localStorage
            this.saveLocalStorage();
            //Class Tween
            this.tweens = new Tween(this.scene);
            {console.log("Laxman: Spin is clicked")}
            fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log("Laxman, fetched Data:",json))
        }
    }

    destroyLineArr() {
        if (Options.lineArray.length > 0) {
            for (let i = 0; i < Options.lineArray.length; i++) {
                Options.lineArray[i].destroy();
            }
            Options.lineArray = [];
        }
    }

    removeTextWin() {
        //play audio button
        this.scene.audioPlayButton();
            
        if(this.scene.audioMusicName === 'btn_music.png') {
            //stop audio win
            this.scene.audioObject.audioWin.stop();
            this.scene.audioObject.audioReels.play();
        }
        //set money
        this.scene.valueMoney -= (Options.coin * Options.line);
        this.scene.txtMoney.setText(this.scene.valueMoney + '$');
        //remove text txtwin
        if (this.scene.txtWin) {
            this.scene.txtWin.destroy();
        }
    }

    setColor() {
        this.bgSpin.setTint(0xa09d9d);
        this.scene.autoSpin.buttonAuto.setTint(0xa09d9d);
        this.scene.maxBet.maxBet.setTint(0xa09d9d);
        this.scene.coin.coin.setTint(0xa09d9d);
        this.scene.btnLine.btnLinePlus.setTint(0xa09d9d);
        this.scene.btnLine.btnLineMinus.setTint(0xa09d9d);
        this.scene.btnMusic.setTint(0xa09d9d);
        this.scene.btnSound.setTint(0xa09d9d);
    }

    saveLocalStorage() {
        if (localStorage.getItem('money')) {
            localStorage.removeItem('money');
            localStorage.setItem('money', this.scene.valueMoney);
        }
        localStorage.setItem('money', this.scene.valueMoney);
        this.scene.setTextX(this.scene.valueMoney);
        this.scene.txtMoney.setText(this.scene.valueMoney + '$');
    }
}