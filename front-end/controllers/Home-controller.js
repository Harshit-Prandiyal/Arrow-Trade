export function handleGoToStockDetail(navigation, id) {
  navigation.navigate("StockDetailScreen", { id: id });
}
export function handleGoToPortfolio(navigation) {
  navigation.navigate("PortfolioScreen");
}
export function joinAndRemoveDuplicates(arr1, arr2) {
  // Join the two arrays using concat
  const combinedArray = arr1.concat(arr2);

  // Create a new Set from the combined array to remove duplicates
  const uniqueArray = [...new Set(combinedArray)];

  return uniqueArray;
}
export function filterResponseByPortfolio(responseArray, portfolioArray) {
    const portfolioIds = portfolioArray.map(item => item.id);
    const filteredArray = responseArray.filter(item => portfolioIds.includes(item.id));
    return filteredArray;
  }
