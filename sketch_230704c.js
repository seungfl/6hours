let imgs = [];
let mosaicSizes = [20, 20];

function preload() {
  imgs[0] = loadImage("image_1.jpg"); // Replace with your actual image path
  imgs[1] = loadImage("image_2.jpg"); // Replace with your actual image path
}

function setup() {
  createCanvas(800, 900);
}

function draw() {
  let y = 0;
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    let x = (width - img.width) / 2;
    image(applyMosaic(img, mosaicSizes[i]), x, y);
    y += img.height;
  }
}

function mouseMoved() {
  let imgIndex = mouseY < imgs[0].height ? 0 : 1;
  mosaicSizes[imgIndex] = mouseX / 10;
  if (mosaicSizes[imgIndex] === 0) {
    mosaicSizes[imgIndex] = 1;
  }
}

function applyMosaic(src, mosaicSize) {
  let result = createImage(src.width, src.height);
  src.loadPixels();
  result.loadPixels();
  for (let y = 0; y < src.height; y += mosaicSize) {
    for (let x = 0; x < src.width; x += mosaicSize) {
      let c = src.get(x, y);
      for (let i = 0; i < mosaicSize; i++) {
        for (let j = 0; j < mosaicSize; j++) {
          if (x + i < src.width && y + j < src.height) {
            result.set(x + i, y + j, c);
          }
        }
      }
    }
  }
  result.updatePixels();
  return result;
}
