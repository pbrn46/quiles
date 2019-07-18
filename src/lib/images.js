
const loadImage = (url) => {
  var image = new Image()
  image.src= url
  return image
}

export const sprites = {
  giraffe: loadImage("/assets/giraffe.png"),
  lion: loadImage("/assets/lion.png"),
  tree: loadImage("/assets/tree.png"),
  rock: loadImage("/assets/rock.png"),
}