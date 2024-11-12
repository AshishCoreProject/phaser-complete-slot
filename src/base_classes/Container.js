import Options from '../options';
import Phaser from 'phaser';
import Slot from './slot';
import { Config } from '../game/main';

export default class Container extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);
        
        // Set default width and height if not defined
        this.setSize(Options.symbolWidth, Options.symbolHeight * 3);

        // Add symbols to the container
        const symbols1 = scene.add.sprite(0, 0, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');
        const symbols2 = scene.add.sprite(0, -Options.symbolHeight, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');
        const symbols3 = scene.add.sprite(0, -Options.symbolHeight * 2, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');
        const symbols4 = scene.add.sprite(0, -Options.symbolHeight * 3, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');
        const symbols5 = scene.add.sprite(0, -Options.symbolHeight * 4, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');
        this.add([symbols1, symbols2, symbols3, symbols4, symbols5]);

        // Initialize components
        this._init(scene);
    }

    _init(scene) {
        // this.slotSize = Options.symbolHeight;  // Define slot size if not already defined
        this._createMask(scene);
        // this._fillWithSlots(scene, 5);
    }

    _createMask(scene) {
        // Create the actual mask
        const shape = scene.make.graphics();
        const shape1 = scene.make.graphics();    
        shape.fillRect(0,180, Config.width, Config.height/1.75);
        
        const mask = shape.createGeometryMask();
        this.setMask(mask);
   
    }

    randomBetween(min, max) {
        return Phaser.Math.Between(min, max); 
    }
}
