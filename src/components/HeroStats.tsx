import { useAppSelector } from "../redux/hooks"
import { spritesSelectors } from "../redux/reducers/sprites"

export function HeroStats() {
  const hero = useAppSelector(spritesSelectors.selectHero)
  return <div>
    <div>HP: {hero.hp}/{hero.hpMax}</div>
    <div>MP: {hero.mp}/{hero.mpMax}</div>
    <div>Power: {hero.power}</div>
  </div>
}