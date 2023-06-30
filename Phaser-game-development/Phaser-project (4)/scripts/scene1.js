class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'scene1' });
  }

  preload() {
    this.load.image("ET", "assets/ET.png");
    this.load.image("Elliott", "assets/Elliot.png");
    this.load.image("Player", "assets/Player.png");
    this.load.image("background", "assets/map.png");
    this.load.image("road", "assets/road.png");
    this.load.image("pwdb", "assets/player-with-diffrent-background.png");
    this.load.image("road-2", "assets/road-2.png");
  }

  create() {
    this.background = this.physics.add.sprite(400, 300, "background");
    this.road = this.physics.add.sprite(650, 360, "road");
    this.road2 = this.physics.add.sprite(50, 90, "road-2");
    this.et = this.physics.add.sprite(100, 300, "ET");
    this.elliott = this.physics.add.sprite(200, 500, "Elliott");
    this.player = this.physics.add.sprite(400, 500, "Player");

    this.key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    this.roads = this.physics.add.group(); // Create a group for the roads
    this.roads.add(this.road);
    this.roads.add(this.road2);

    this.physics.add.collider(this.player, this.roads, this.changeBackground, null, this);
    this.physics.add.collider(this.player, this.background); // Add collision between player and background
  }

  update() {
    if (Phaser.Input.Keyboard.JustUp(this.key_up) || this.key_up.isDown) {
      this.player.y -= 5;
      if (this.newPlayer) {
        this.newPlayer.y -= 5;
      }
    } else if (Phaser.Input.Keyboard.JustUp(this.key_down) || this.key_down.isDown) {
      this.player.y += 5;
      if (this.newPlayer) {
        this.newPlayer.y += 5;
      }
    } else if (Phaser.Input.Keyboard.JustUp(this.key_left) || this.key_left.isDown) {
      this.player.x -= 5;
      if (this.newPlayer) {
        this.newPlayer.x -= 5;
      }
    } else if (Phaser.Input.Keyboard.JustUp(this.key_right) || this.key_right.isDown) {
      this.player.x += 5;
      if (this.newPlayer) {
        this.newPlayer.x += 5;
      }
    }
  }

  changeBackground() {
    this.newPlayer = this.physics.add.sprite(this.player.x, this.player.y, "pwdb");
    this.newPlayer.setCollideWorldBounds(true); // Enable world bounds collision for newPlayer
    this.player.disableBody(); // Disable physics for the original player
    this.player.setVisible(false); // Hide the original player

    this.physics.world.removeCollider(this.playerRoadCollider); // Remove the collision between player and road

    // Add a new collider to detect when the player steps out of the road
    this.playerWorldCollider = this.physics.add.collider(this.newPlayer, this.background, this.resetBackground, null, this);
  }

  resetBackground() {
    this.player.enableBody(true, this.newPlayer.x, this.newPlayer.y, true, true); // Re-enable physics for the original player
    this.player.setVisible(true); // Show the original player

    if (this.newPlayer) {
      this.newPlayer.destroy(); // Destroy the newPlayer sprite if it exists
      this.newPlayer = null; // Reset newPlayer variable
    }

    // Add the collider back between player and road
    this.playerRoadCollider = this.physics.add.collider(this.player, this.roads, this.changeBackground, null, this);
  }
}
