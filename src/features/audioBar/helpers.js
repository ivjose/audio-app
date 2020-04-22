export function inBetween({ selected, min, max }) {
  return selected >= min && selected < max;
}

export function compareWord(wordOne, wordTwo) {
  console.log(
    wordOne,
    wordTwo,
    wordOne.includes(wordTwo),
    "DDDDDDDDDDDDDDDDdddd"
  );

  if (!wordOne || !wordTwo) {
    return false;
  }
  return wordOne.includes(wordTwo);
}

export function secondsToMinutes(timeInSeconds) {
  const pad = (num, size) => {
      return ("000" + num).slice(size * -1);
    },
    time = parseFloat(timeInSeconds).toFixed(3),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);

  return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
}

export function percentage(partialValue, totalValue) {
  const percentValue = (100 * partialValue) / totalValue;
  return `${Math.round(percentValue)}%`;
}
