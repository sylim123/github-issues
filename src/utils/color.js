export const getRandomColorCode = () => (
  `#${Math.floor(Math.random() * 16777215).toString(16)}`
);
