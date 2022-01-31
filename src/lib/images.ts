
const loadImage = (src: string) => {
  var image = new Image()
  image.src = src
  return { image, src }
}

export const sprites = {
  giraffe: loadImage("/assets/giraffe.png"),
  lion: loadImage("/assets/lion.png"),
  tree: loadImage("/assets/tree.png"),
  rock: loadImage("/assets/rock.png"),
  flower: loadImage("/assets/flower.png"),
  gun: loadImage("/assets/gun.png"),
  gunEquipped: loadImage("/assets/gunEquipped.png"),
}

export type SpriteImageKey = keyof typeof sprites