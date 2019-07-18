export const HERO_TEMPLATE = {
  x: 0,
  y: 0,
  direction: 'left',
  hp: 100,
  hpMax: 100,
  mp: 50,
  mpMax: 50,
  power: 100,
  image: "giraffe"
}

export const FOE_TEMPLATE = {
  x: 0,
  y: 0,
  hp: 100,
  hpmax: 100,
  mp: 50,
  mpmax: 50,
  power: 100,
  image: "lion"
}

export const ITEM_TEMPLATE_TREE = {
  itemType: "powerBoost",
  effects: { power: 50 },
  image: 'tree',
}

export const TILE_TEMPLATE_ROCK = {
  name: 'rock',
  image: 'rock',
  passible: false,
}

export const INITIAL_STATE = {
  map: {
    width: 30,
    height: 20,
  },
  view: {
    widthPx: 800,
    heightPx: 500,
    xPx: 0,
    yPx: 0,
  },
  config: {
    tileSizePx: 32,
  },
  sprites: {
    hero: HERO_TEMPLATE,
    items: [
      { ...ITEM_TEMPLATE_TREE, x: 5, y: 8, },
      { ...ITEM_TEMPLATE_TREE, x: 5, y: 10, },
      { ...ITEM_TEMPLATE_TREE, x: 2, y: 12, },
      { ...ITEM_TEMPLATE_TREE, x: 3, y: 12, },
      { ...ITEM_TEMPLATE_TREE, x: 4, y: 12, },
    ],
    tiles: [
      { ...TILE_TEMPLATE_ROCK, x: 6, y: 9, },
      { ...TILE_TEMPLATE_ROCK, x: 8, y: 9, },
      { ...TILE_TEMPLATE_ROCK, x: 6, y: 10, },
      { ...TILE_TEMPLATE_ROCK, x: 8, y: 10, },
      { ...TILE_TEMPLATE_ROCK, x: 6, y: 11, },
      { ...TILE_TEMPLATE_ROCK, x: 7, y: 11, },
      { ...TILE_TEMPLATE_ROCK, x: 8, y: 11, },
    ],
    foes: [
      { ...FOE_TEMPLATE, x: 3, y: 2 },
    ]
  },
  inventory: {
    equipped: {
      head: null,
      legs: null,
      arms: null,
      shoulders: null,
      chest: null,
    },
    bags: {
      default: {
        maxItems: 50,
        contents: [],
      }
    },
  },
}
