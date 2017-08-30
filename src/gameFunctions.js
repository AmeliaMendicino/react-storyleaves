export const shuffle = array => {
  let shuffled = [...array];

  for (let i = shuffled.length; i; i--) {
    let rand = Math.floor(Math.random() * i);
    [shuffled[i - 1], shuffled[rand]] = [shuffled[rand], shuffled[i - 1]];
  }

  return shuffled;
};
