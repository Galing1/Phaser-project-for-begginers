class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'scene1' });
  }

  preload() {
    this.load.image('bird', 'assets/flappy-bird.png');
    this.load.image('pipe', 'assets/square-pipe.png');
    this.load.audio('music', 'assets/flappy-bird-song.mp3') ;
  }

  create() {
    this.music = this.sound.add('music') ;
    this.music.play() ;

    this.bird = this.physics.add.sprite(100, 245, 'bird');
    this.bird.body.gravity.y = 1000;

    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.input.keyboard.on('keydown-' + 'SPACE', this.jump, this);

    this.pipes = this.add.group();

    this.timer = this.time.addEvent({ delay: 1500, callback: this.addRowOfPipes, callbackScope: this, loop: true });

    this.physics.add.collider(this.bird, this.pipes, this.restartGame, null, this) ;
    this.score = -2 ;
    this.labelScore = this.add.text(20, 20, "0", {
      font: "50px Arial",
      fill: "#ffffff"
    }) ;

    this.add.text (
      350, 
      50,
      "All credits belong to Gal oron",
      {
        fontSize: 30,
        color: "#ffffff",
        fontStyle: "bold"
      }
    ).setOrigin(0.5) ;
  }

  update() {
    if (this.bird.y < 0 || this.bird.y > 490) {
      this.restartGame();
    }
  }

  jump() {
    this.bird.body.velocity.y = -350;
  }
 
  restartGame() {
    this.scene.start("resetScene");
    this.music.stop() ;
  }

  addOnePipe(x, y) {
    var pipe = this.physics.add.sprite(x, y, 'pipe');
    this.pipes.add(pipe);

    pipe.body.velocity.x = -200;

    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  }

  addRowOfPipes() {
    var gapSize = 2; // Number of square-pipes to skip for each gap
    var gapPosition = Phaser.Math.Between(1, 5 - gapSize); // Position of the first square-pipe in the gap

    for (var i = 0; i < 8; i++) {
      if (i < gapPosition || i >= gapPosition + gapSize) {
        this.fullPipe = this.addOnePipe(800, i * 80 + 30);
      }
    }
    this.score += 1 ;
    this.labelScore.text = this.score ;
  }
    
}
