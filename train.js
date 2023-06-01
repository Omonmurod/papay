// CHALLENGE: MAX PROFIT

function buyStock(stock_prices) {
  let smallestNumber = stock_prices[0];
  let smallestIndex = 0;

  for (let i = 1; i < stock_prices.length; i++) {
    if (stock_prices[i] < smallestNumber) {
      smallestNumber = stock_prices[i];
      smallestIndex = i;
    }
  }

  return smallestIndex;
}

const prices = [9, 6, 4, 5, 30, 11];
console.log("You should buy stock =>", buyStock(prices));