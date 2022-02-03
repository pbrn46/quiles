import { SpriteImageKey, sprites } from "../lib/images"
import { SpriteBase } from "../lib/sprite"


type SpriteImgProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  sprite: SpriteImageKey | SpriteBase
}
export function SpriteImg({ sprite, ...props }: SpriteImgProps) {

  const image = typeof sprite === "string" ? sprites[sprite] : sprites[sprite.image]
  return <img
    src={image.src}
    className="w-full w-max-full"
    {...props}
    alt={props.alt || "sprite"}
  />
}