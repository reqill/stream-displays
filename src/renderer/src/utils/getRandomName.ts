const funnyNamesPart1 = ['atrocious', 'boring', 'crazy', 'dumb', 'evil', 'funky', 'giant', 'hairy'];
const funnyNamesPart2 = ['oranges', 'bananas', 'apples', 'pears', 'grapes', 'cherries', 'plums'];

export const getRandomName = () => {
  const part1 = funnyNamesPart1[Math.floor(Math.random() * funnyNamesPart1.length)];
  const part2 = funnyNamesPart2[Math.floor(Math.random() * funnyNamesPart2.length)];

  return `${part1}-${part2}`;
};
