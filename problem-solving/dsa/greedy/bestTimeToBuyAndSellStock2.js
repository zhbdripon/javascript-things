// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let prof = 0;

  let lastBuyPrice = 123456789;

  for (let [index, price] of prices.entries()) {
    if (price > lastBuyPrice) {
      prof += price - lastBuyPrice;
      lastBuyPrice = price;
    } else {
      lastBuyPrice = Math.min(lastBuyPrice, price);
    }
  }

  return prof;
};
