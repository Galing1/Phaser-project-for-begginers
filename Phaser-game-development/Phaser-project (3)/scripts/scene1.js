class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'scene1' }) ;
  }

  preload() {
    this.load.image('Carl-Fredricksen', 'assets/Carl-Fredricksen.png') ;
    this.load.image('Asteroid', 'assets/Asteroid.png') ;
    this.load.image('cloud', 'assets/cloud.png') ;
    this.load.audio('married-life', 'assets/married-life-music.mp3') ;
  }

  create() {
    this.music = this.sound.add('married-life') ;
    this.music.play() ;
    this.grandpa = this.physics.add.sprite(80, 450, 'Carl-Fredricksen').setDepth(1000) ;

    this.startTime = this.time.now ;

    this.spawnCloud() ;

    this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT) ;

    this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT) ;

    this.timer = this.time.addEvent({ delay: 5000, callback: this.spawnAsteroid, callbackScope: this, loop: true });

    this.timer2 = this.time.addEvent({ delay: 20000, callback: this.spawnCloud, callbackScope: this, loop: true });

    this.labelScore = this.add.text(
      350, 
      50,
      "0",
      {
        fontSize: 80,
        fill: "#ffffff"
      }
    ).setOrigin(0.5) ;

    if (this.score === 60) {
      this.restartGame() ;
    }

  }

  update() {
    if (this.key_right.isDown) {
      this.grandpa.x += 5 ;
    }

    if (this.key_left.isDown) {
      this.grandpa.x -= 5 ;
    }

    if (this.grandpa.x === 0 || this.grandpa.x === 800) {
      this.restartGame() ;
    } 

    this.currentTime = this.time.now ;
    this.elapsedTime = Math.floor((this.currentTime - this.startTime) / 1000) ;

    this.labelScore.setText("Score:" + this.elapsedTime) ;
  }

  spawnAsteroid() {
    var randomNumber = Math.random() * 2 ;

    if (randomNumber <= 0.5) {
      var asteroid = this.physics.add.sprite(150, 150, 'Asteroid').setDepth(100);

      asteroid.body.velocity.x = 200;
      asteroid.body.velocity.y = 200 ;
    } else if (randomNumber > 0.5 && randomNumber <= 1) {
      var asteroid = this.physics.add.sprite(450, 150, 'Asteroid').setDepth(50);

      asteroid.body.velocity.x = -200;
      asteroid.body.velocity.y = 200 ;
    } else if (randomNumber > 1 && randomNumber <= 1.5) {
      var asteroid = this.physics.add.sprite(300, 150, 'Asteroid').setDepth(40);

      asteroid.body.velocity.x = 200;
      asteroid.body.velocity.y = 200 ;
    } else {
      var asteroid = this.physics.add.sprite(300, 150, 'Asteroid').setDepth(30);

      asteroid.body.velocity.x = -200;
      asteroid.body.velocity.y = 200 ;
    }
    
    asteroid.checkWorldBounds = true;
    asteroid.outOfBoundsKill = true;

    this.physics.add.collider(this.grandpa, asteroid, this.restartGame, null, this) ;
  }

  spawnCloud() {
    var randomNumber = Math.random() * 2 ;

    if (randomNumber <= 1) {
      this.cloud1 = this.physics.add.sprite(200, 150, 'cloud').setDepth(20) ;
      this.cloud2 = this.physics.add.sprite(550, 150, 'cloud').setDepth(30) ;

      this.cloud1.body.velocity.y = 50 ;
      this.cloud2.body.velocity.y = 50 ;

      this.cloud1.setBlendMode(Phaser.BlendModes.NORMAL) ;
      this.cloud2.setBlendMode(Phaser.BlendModes.SCREEN) ;

      this.cloud = this.add.group()
      this.cloud.addMultiple([this.cloud1, this.cloud2]);
    } else {
      this.cloud = this.physics.add.sprite(325, 150, 'cloud').setDepth(20) ;

      this.cloud.body.velocity.y = 50 ;

      this.cloud.setBlendMode(Phaser.BlendModes.SCREEN) ;
    }

    this.physics.add.collider(this.grandpa, this.cloud, this.restartGame, null, this) ;
  }

  restartGame() {
    // Transition to Scene2 if the score is 60
    this.scene.start('restartScene', { score: this.elapsedTime });
    this.music.stop() ;
  }
}

class RestartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'restartScene' });
  }

  preload() {
    this.load.image('3-stars', 'assets/3-stars.png') ;
    this.load.image('2-stars', 'assets/2-stars.png') ;
    this.load.image('1-star', 'assets/1-star.png') ;
    this.load.image('0-stars', 'assets/0-stars.png') ;
    this.load.image('button', 'assets/restart-button.png') ;
    this.load.audio('sad-music', 'assets/sad-music.mp3') ;
    this.load.audio('up-with-tiles', 'assets/up-with-tiles-music.mp3') ;
  }

  init(data) {
    // Access the score passed from the previous scene
    this.score = data.score;
  }

  create() {
    // Use the score in the second scene
    
    if (this.score === 60) {
      this.threeStars = this.physics.add.sprite(350, 200, '3-stars') ;
      this.button() ;
      this.music = this.sound.add('up-with-tiles') ;
      this.music.play() ;
    } else if (this.score < 60 && this.score >= 40) {
      this.twoStars = this.physics.add.sprite(350, 200, '2-stars') ;
      this.button() ;
      this.sadMusic = this.sound.add('sad-music') ;
      this.sadMusic.play() ;
    } else if (this.score < 40 && this.score >= 20) {
      this.oneStar = this.physics.add.sprite(350, 200, '1-star') ;
      this.button() ;
      this.sadMusic = this.sound.add('sad-music') ;
      this.sadMusic.play() ;
    } else {
      this.noStar = this.physics.add.sprite(350, 200, '0-stars') ;
      this.button() ;
      this.sadMusic = this.sound.add('sad-music') ;
      this.sadMusic.play() ;
    }
    // ...
  }

  update() {

  }

  button() {
    this.add.text (
      350, 
      370,
      "GAME OVER",
      {
        fontSize: 100,
        color: "#000000",
        fontStyle: "bold"
      }
    ).setOrigin(0.5) ;

    const button = this.add.image(350, 470, 'button') ;

    this.input.keyboard.on('keyup', function(event) {
      if (event.key === ' ') {
        this.scene.start('scene1') ;
        this.sadMusic.stop() ;
        this.music.stop() ;
      } 
    }, this) ;

    button.setScale(1.2) ;
    button.setInteractive() ;
    button.on('pointerdown', () => {
      this.scene.start("scene1") ; 
      this.sadMusic.stop() ;
      this.music.stop() ;
    }) ;
  }
}


