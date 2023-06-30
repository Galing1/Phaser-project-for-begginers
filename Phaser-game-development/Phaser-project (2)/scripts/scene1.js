class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'scene1' });
    this.isJumping = false;
    this.power = 0;
    this.cactus = null; // Define cactus as a class property
  }

  preload() {
    this.load.image('dino', 'assets/dinosaur.png');
    this.load.image('cactus', 'assets/cactus.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.audio('music', 'assets/flappy-bird-song.mp3') ;
  }

  create() {
    this.music = this.sound.add('music') ;
    this.music.play({loop: true}) ;

    this.dino = this.physics.add.sprite(50, 280, 'dino');

    let ground = this.physics.add.sprite(50, 320, 'ground');
    ground.displayWidth = this.sys.game.config.width * 1.9;
    ground.setImmovable();

    this.physics.add.collider(this.dino, ground);

    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.spaceKey.on('down', this.startJump, this);
    this.spaceKey.on('up', this.endJump, this);

    this.timer = this.time.addEvent({ delay: 3000, callback: this.addCactus, callbackScope: this, loop: true });

    this.physics.add.collider(this.dino, this.cactus, this.gameOver.bind(this));

    this.score = -2 ;
    this.labelScore = this.add.text(20, 20, "0", {
      font: "50px Arial",
      fill: "#000000  "
    }) ;

    
    this.add.text (
      350, 
      50,
      "All credits belong to Gal oron",
      {
        fontSize: 30,
        color: "#000000",
        fontStyle: "bold"
      }
    ).setOrigin(0.5) ;
  }

  startJump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.dino.setVelocityY(-650);
    }
  }

  endJump() {
    this.isJumping = false;
    this.dino.setVelocityY(0);
    setTimeout(() => {
      this.dino.setVelocityY(300);
    }, 400); // 1 second delay before falling
  }

  update() {
    if (this.dino.y > 280) {
      this.dino.y = 280;
      this.dino.setVelocityY(0);
    }

    if (this.cactus) {
      this.physics.collide(this.dino, this.cactus, this.gameOver.bind(this));
    }

    if (this.dino.y < 0) {
      this.gameOver();
    }
  }

  addCactus() {
    this.cactus = this.physics.add.sprite(600, 280, 'cactus');

    this.cactus.body.velocity.x = -500;

    this.cactus.checkWorldBounds = true;
    this.cactus.outOfBoundsKill = true;

    this.score += 1 ;
    this.labelScore.text = this.score ;
  }

  gameOver() {
    this.scene.start('resetScene') ;
    this.music.stop() ;
  }  
}
