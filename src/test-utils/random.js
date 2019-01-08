let realRandom = global.Math.random;

export const useFakeRandom = () => {
  const HEADS = 0,
        TAILS = 0.9;
  let counter = TAILS;
  global.Math.random = () => {
    counter = counter === TAILS ? HEADS : TAILS;
    return counter;
  }
};

export const useRealRandom = () => {
  global.Math.random = realRandom;
};
