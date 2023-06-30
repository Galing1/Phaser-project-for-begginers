class restartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'restartScene' });
    }
  
    init(data) {
      // Access the score passed from the previous scene
      this.score = data.score;
    }
  
    create() {
      // Use the score in the second scene
      console.log('Score:', this.score);
      // ...
    }

    update() {

    }
  
    // ...
  }
  
  // Export the Scene2 class
export default restartScene;
  