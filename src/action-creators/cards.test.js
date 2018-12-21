import { shuffle } from './cards';


const mockData = [1, 2, 3, 4, 5, 6];

test('Test returns the same array', () => {
  expect(shuffle(mockData)).toBe(mockData);
});

test('Test randomly shuffles the elements of an array', () => {
  const originalOrder = [...mockData];
  shuffle(mockData);
  const firstShuffle = [...mockData];
  shuffle(mockData);
  const secondShuffle = [...mockData];
  shuffle(mockData);
  const thirdShuffle = [...mockData];
  expect(firstShuffle).not.toEqual(originalOrder);
  expect(secondShuffle).not.toEqual(originalOrder);
  expect(thirdShuffle).not.toEqual(originalOrder);
  expect(firstShuffle).not.toEqual(secondShuffle);
  expect(firstShuffle).not.toEqual(thirdShuffle);
  expect(secondShuffle).not.toEqual(thirdShuffle);
});

test('Test if passed an ampty array, it returns the empty array', () => {
  const emptyArray = [];
  expect(shuffle(emptyArray)).toBe(emptyArray);
  expect(emptyArray).toEqual([]);
});
