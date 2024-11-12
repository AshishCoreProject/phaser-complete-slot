import Phaser from 'phaser';
import Options from '../options';

export default class Slot extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        // Choose a random symbol from 0 to 9 (or adjust to your symbol range)
        const randomSymbolIndex = Phaser.Math.Between(0, 9);
        const symbolKey = `symbols_${randomSymbolIndex}.png`;

        // Initialize the slot symbol sprite
        super(scene, x, y, 'symbols', symbolKey);
        
        // Add the sprite to the scene
        scene.add.existing(this);
        
        // Set the origin of the slot (adjust if necessary)
        this.setOrigin(0.5);

        // Optional: Scale the slot to fit the symbol size if needed
        this.setDisplaySize(Options.symbolWidth, Options.symbolHeight);
    }
}