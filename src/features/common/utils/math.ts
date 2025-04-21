export const splitHundredToArray = (count: number) => {
  if (count < 2) {
    return [100];
  }

  const result = [0];
  const segment = 100 / (count - 1);

  for (let i = 1; i < count; i++) {
    result.push(parseFloat((segment * i).toFixed(4)));
  }

  result.push(100);
  return result;
};

export const percentagesToSplitPoints = (percentages: number[]) => {
  if (!Array.isArray(percentages) || percentages.length === 0) {
    return [0, 100];
  }

  const sum = percentages.reduce((acc, val) => acc + val, 0);
  if (Math.abs(sum - 100) > 1e-6) {
    return [0, 100];
  }

  const splitPoints = [0];
  let cumulative = 0;

  for (const percentage of percentages) {
    cumulative += percentage;
    splitPoints.push(parseFloat(cumulative.toFixed(2)));
  }

  splitPoints.push(100);
  return splitPoints;
};

export const splitPointsToPercentages = (splitPoints: number[]) => {
  if (!Array.isArray(splitPoints) || splitPoints.length < 2) {
    return [];
  }

  const percentages = [];
  for (let i = 1; i < splitPoints.length; i++) {
    const difference = splitPoints[i] - splitPoints[i - 1];
    percentages.push(parseFloat(difference.toFixed(2)));
  }

  return percentages;
};
