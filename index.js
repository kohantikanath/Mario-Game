const canvas = document.querySelector("canvas");
const b = document.querySelector("body");
const platform = "./Images/platform.png";
const hills = "./Images/hills.png";
const background = "./Images/background.png";
const platformSmallTall = ".//Images/platformSmallTall.png";

const spriteRunLeft = "Images/spriteRunLeft.png";
const spriteRunRight = "Images/spriteRunRight.png";
const spriteStandLeft = "Images/spriteStandLeft.png";
const spriteStandRight = "Images/spriteStandRight.png";

const c = canvas.getContext("2d"); //c =context

canvas.width = 1024; //parseInt(getComputedStyle(b).width)
canvas.height = 576; //parseInt(getComputedStyle(b).height)

let startgame = false;
const gravity = 0.7;
class Player {
  constructor() {
    this.speed = 10;
    this.position = {
      x: 90,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 66;
    this.height = 150;

    this.image = createImage(spriteStandRight);
    this.frames = 0;
    this.sprites = {
      stand: {
        right: createImage(spriteStandRight),
        left: createImage(spriteStandLeft),
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: createImage(spriteRunRight),
        left: createImage(spriteRunLeft),
        cropWidth: 341,
        width: 127.875,
      },
    };

    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 177;
  }

  draw() {
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (
      this.frames > 59 &&
      (this.currentSprite === this.sprites.stand.right ||
        this.currentSprite === this.sprites.stand.left)
    )
      this.frames = 0;
    else if (
      this.frames > 29 &&
      (this.currentSprite === this.sprites.run.right ||
        this.currentSprite === this.sprites.run.left)
    )
      this.frames = 0;

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

let platformImage = createImage(platform);
let platformSmallTallImage = createImage(platformSmallTall);
let player = new Player();
let platforms = [];
let genericObject = [];

let lastKey;
const keys = {
  //a dictionary
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

function init() {
  platformImage = createImage(platform);
  player = new Player();
  platforms = [
    new Platform({
      x:
        platformImage.width * 4 +
        300 -
        3 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 190,
      image: createImage(platformSmallTall),
    }),
    new Platform({
      x:
        platformImage.width * 6 +
        1000 -
        3 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 190,
      image: createImage(platformSmallTall),
    }),
    new Platform({
      x:
        platformImage.width * 6 +
        1400 -
        3 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 190,
      image: createImage(platformSmallTall),
    }),
    new Platform({
      x:
        platformImage.width * 8 +
        1950 -
        3 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 190,
      image: createImage(platformSmallTall),
    }),
    new Platform({
      x:
        platformImage.width * 8 +
        2300 -
        3 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: createImage(platformSmallTall),
    }),
    new Platform({
      x:
        platformImage.width * 8 +
        2650 -
        3 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 190,
      image: createImage(platformSmallTall),
    }),

    new Platform({
      x: -1,
      y: 480,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width - 2,
      y: 480,
      image: platformImage,
    }),

    new Platform({
      x: platformImage.width * 2 + 200,
      y: 480,
      image: platformImage,
    }),

    new Platform({
      x: platformImage.width * 3 + 300,
      y: 480,
      image: platformImage,
    }),

    new Platform({
      x: platformImage.width * 4 + 500 - 2,
      y: 480,
      image: platformImage,
    }),

    new Platform({
      x: platformImage.width * 5 + 700 - 2,
      y: 480,
      image: platformImage,
    }),

    new Platform({
      x: platformImage.width * 6 + 900 - 2,
      y: 480,
      image: platformImage,
    }),

    new Platform({
      x: platformImage.width * 7 + 1600 - 2,
      y: 480,
      image: platformImage,
    }),

    new Platform({
      x: platformImage.width * 8 + 1600 - 3,
      y: 480,
      image: platformImage,
    }),

    new Platform({
      x: platformImage.width * 9 + 2600 - 3,
      y: 480,
      image: platformImage,
    }),
  ];

  genericObject = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background),
    }),

    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills),
    }),
  ];
  scrollOffset = 0;
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObject.forEach((genericObject) => {
    genericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  if (startgame) player.update();
  else {
    c.fillStyle = "rgb(0, 0, 0, 0.6)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    document.querySelector("#display").style.display = "block";
    document.querySelector("#display").innerHTML =
      "Press ENTER to start the game!!!";
  }

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericObject.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });

      genericObject.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }
  }

  //platform collition detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // sprite switching
  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.frames = 1;
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.currentSprite = player.sprites.run.left;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.currentSprite = player.sprites.stand.left;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  }

  // win condition
  if (scrollOffset > platformImage.width * 9 + 2600 - 3) {
    player.speed = 0;
    c.fillStyle = "rgb(0, 0, 0, 0.6)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    document.querySelector("#display").style.display = "block";
    document.querySelector("#display").innerText =
      "You won!!! \nPress ENTER to restart the game!!!";
    addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        location.reload();
      }
    });
  }

  // lose condition
  if (player.position.y > canvas.height) location.reload();
}


init();
animate();

addEventListener("keydown", (e) => {
  // console.log(e.key)
  switch (e.key) {
    case "ArrowLeft":
      console.log("left");
      keys.left.pressed = true;
      lastKey = "left";
      break;

    case "ArrowDown":
      console.log("Down");
      break;

    case "ArrowRight":
      console.log("right");
      keys.right.pressed = true;
      lastKey = "right";
      break;

    case "ArrowUp":
      console.log("up");
      if (player.velocity.y == 0) player.velocity.y -= 20;
      break;

    case "Enter":
      startgame = true;
      document.querySelector("#display").style.display = "none";
      break;
  }
});

addEventListener("keyup", (e) => {
  // console.log(e.key)
  switch (e.key) {
    case "ArrowLeft":
      console.log("left");
      keys.left.pressed = false;
      break;

    case "ArrowDown":
      console.log("Down");
      break;

    case "ArrowRight":
      console.log("right");
      keys.right.pressed = false;

      break;

    case "ArrowUp":
      console.log("up");
      // player.velocity.y -= 20
      break;
  }
});
