import { parseCardData, parseCards, resetCardId } from './game';


const expectedCards = {};
const mockCardData = {
  levels: [
    {
      difficulty: 'easy',
      cards: ['a', 'b', 'c'],
    },
    {
      difficulty: 'hard',
      cards: ['a', 'b', 'c', 'd', 'e'],
    },
  ],
};

mockCardData.levels.forEach((level, levelIndex) => {
  expectedCards[level.difficulty] = level.cards.map((symbol, cardIndex) => ({
    // the expected card IDs are based on the stubbed Math.random -- see beforeEach, below
    id: cardIndex + (levelIndex > 0 ? mockCardData.levels[levelIndex - 1].cards.length : 0),
    match: false,
    symbol,
  }));
});

beforeEach(() => {
  // Stub Math.random because it is called to create unique ids within the parseCardData function
  const mockMath = Object.create(global.Math);
  mockMath.random = jest.fn().mockImplementation(() => 1);
  global.Math = mockMath;
  resetCardId(); // reset the cardId variable that is within the scope of the tested functions
});

afterEach(() => jest.clearAllMocks());

test('parseCardData returns an object that has a key `levels` containing an array of the level difficulty as strings', () => {
  const result = parseCardData(mockCardData);
  expect(result).toHaveProperty('levels');
  expect(result.levels).toEqual(mockCardData.levels.map(level => level.difficulty));
});

test('parseCardData returns an object that has a key `cardsByLevel`containing an object with level names', () => {
  const result = parseCardData(mockCardData);
  expect(result).toHaveProperty('cardsByLevel');
  expect(result.cardsByLevel).toHaveProperty('easy', expectedCards.easy);
  expect(result.cardsByLevel).toHaveProperty('hard', expectedCards.hard);
});

test('parseCardData returns an object that has a key `cardsById`, with the value of an object whose keys are the ids of all the cards', () => {
  const expectedCardSymbols = mockCardData.levels.reduce((acc, curr) => acc.concat(curr.cards), []);
  const result = parseCardData(mockCardData);

  expect(result).toHaveProperty('cardsById');
  Object.keys(result.cardsById).forEach((key, idx) => {
    // the expected card IDs are based on the stubbed Math.random
    expect(key).toEqual(`${idx}`);
    expect(result.cardsById[key]).toEqual({
      id: +key,
      match: false,
      symbol: expectedCardSymbols[idx],
    });
  });
});

test('parseCards calls Math.random for every card', () => {
  parseCards(mockCardData.levels[0].cards);
  expect(Math.random).toHaveBeenCalledTimes(mockCardData.levels[0].cards.length);
});

test('parseCards returns a list of: {id: number, symbol: string, match: boolean}', () => {
  const results = parseCards(mockCardData.levels[0].cards);
  results.forEach((result, i) => {
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('symbol');
    expect(result).toHaveProperty('match');
    expect(result).toEqual(expectedCards[mockCardData.levels[0].difficulty][i]);
  });
});

test('parseCards accepts a callback as the second argument, which is called on every "parsed" card', () => {
  const spy = jest.fn();
  parseCards(mockCardData.levels[0].cards, spy);
  expect(spy).toHaveBeenCalledTimes(mockCardData.levels[0].cards.length);
  mockCardData.levels[0].cards.forEach((cardSymbol, i) => {
    expect(spy.mock.calls[i][0]).toEqual(expectedCards[mockCardData.levels[0].difficulty][i]);
  });
});
