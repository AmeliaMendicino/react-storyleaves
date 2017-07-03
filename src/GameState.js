const k_VALUES = {};

export class GameState {
  constructor(name) {
    this.name = name;
    k_VALUES[name] = this;
  }

  static create(name) {
    if (k_VALUES[name]) {
      return k_VALUES[name];
    }
    return GameState.UNKNOWN;
  }
}

GameState.UNKNOWN = new GameState('Invalid State');
GameState.NEW_GAME = new GameState('New Game');
GameState.PICK_DECK = new GameState('Pick Deck');
GameState.CREATE_DECK = new GameState('Create Deck');
GameState.SETUP = new GameState('Setup');
