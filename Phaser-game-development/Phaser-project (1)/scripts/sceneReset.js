class resetScene extends Phaser.Scene {
  constructor() {
    super({ key: 'resetScene' });
  }

  preload() {
    this.load.image('button', 'assets/restart-button.png') ;
    this.load.audio('sad-music', 'assets/sad-music.mp3') ;
  }

  create() {
    this.music = this.sound.add('sad-music') ;
    this.music.play() ; 
 
    this.add.text (
      350, 
      250,
      "GAME OVER",
      {
        fontSize: 100,
        color: "#ffffff",
        fontStyle: "bold"
      }
    ).setOrigin(0.5) ;

    const button = this.add.image(350, 370, 'button') ;

    this.input.keyboard.on('keyup', function(event) {
      if (event.key === ' ') {
        this.scene.start('scene1') ;
        this.music.stop() ;
      } 
    }, this) ;
  
    button.setScale(1.2) ;
    button.setInteractive() ;
    button.on('pointerdown', () => {
      this.scene.start("scene1") ;
      this.music.stop() ;
    }) ;
    button.on('pointerover', () => {
      document.querySelector('canvas')
        .classList.add('hovered') ;
    })
    button.on('pointerout', () => {
      document.querySelector('canvas')
        .classList.remove('hovered') ;
    })
    button.cursor = 'pointer' ; 
  }

  update(delta) {

  }
}
