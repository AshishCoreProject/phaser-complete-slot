import {Config} from '../../src/game/main';
import Options from '../options';
import Sprite from './Sprite';
//Class Line
export default class Line {
    constructor(scene) {
        this.scene = scene;
        this.addLine();
        this.minusLine();
    }

    addLine() {
        // this.btnLinePlus = new Sprite(this.scene, Config.width - 760, Config.height - 67, 'bgButtons', 'plus_button.png');
        // this.btnLinePlusClick = new Sprite(this.scene, Config.width - 760, Config.height - 67, 'bgButtons','plus_button_click.png');
        // this.btnLinePlusClick.setVisible(false);

        this.txtLine = this.scene.add.dynamicBitmapText(Config.width - 915, Config.height - 70, 'txt_bitmap', Options.txtLine, 38);
        this.txtLine.setDisplayCallback(this.scene.textCallback);
        this.txtCountLine = this.scene.add.text(Config.width - 855, Config.height - 90, Options.line, {
            fontSize : '35px',
            color : '#fff',
            fontFamily : 'Montserrat'
        });
        this.txtCountLine.setVisible(false)
        /*
        //pointer down
        this.btnLinePlus.on('pointerdown', () => {
            this.addUpdateLogic();
            if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {

                this.btnLinePlus.setVisible(false);
                this.btnLinePlusClick.setVisible(true);
            }
        });

        //pointer up
        this.btnLinePlus.on('pointerout', () => {
            if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {
                this.btnLinePlus.setVisible(true);
                this.btnLinePlusClick.setVisible(false);
            }
        })
        */

    }

    addUpdateLogic(){
        if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {

            //play audio button
            this.scene.audioPlayButton();
        
            if (Options.line < 20) {
                Options.line ++;
                this.txtCountLine.setText(Options.line);
                this.scene.maxBet.txtCountMaxBet.setText(Options.line * Options.coin);
            } else {
                Options.line = 1;
                this.txtCountLine.setText(Options.line);
                this.scene.maxBet.txtCountMaxBet.setText(Options.line * Options.coin);
            }
        }
    }

    minusLine(){
        // this.btnLineMinus = new Sprite(this.scene, Config.width - 920, Config.height - 67, 'bgButtons', '-button.png');

        // this.btnLineMinusClick = new Sprite(this.scene, Config.width - 920 , Config.height - 67, 'bgButtons', '-button_click.png');
        // this.btnLineMinusClick.setVisible(false);

        /*
        //pointer down
        this.btnLineMinus.on('pointerdown', () => {
           this.minusUpdateLogic();
           this.btnLineMinus.setVisible(false);
           this.btnLineMinusClick.setVisible(true);
         })

         //pointer release
         this.btnLineMinus.on('pointerout', ()=> {
            this.btnLineMinus.setVisible(true);
            this.btnLineMinusClick.setVisible(false);
         })
        */

        }

    minusUpdateLogic(){
        if (!Options.checkClick &&  Options.txtAutoSpin === 'AUTO'){

            //play audio button
            this.scene.audioPlayButton();

            if(Options.line > 1) {
                Options.line --;
                this.txtCountLine.setText(Options.line);
                this.scene.maxBet.txtCountMaxBet.setText(Options.line * Options.coin);
            } else{
                Options.line = 20;
                this.txtCountLine.setText(Options.line);
                this.scene.maxBet.txtCountMaxBet.setText(Options.line * Options.coin);
            }
           } 
    }
    
    
}