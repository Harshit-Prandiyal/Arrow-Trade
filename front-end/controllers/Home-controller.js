export function handleGoToStockDetail(navigation, id) {
    navigation.navigate("StockDetailScreen", { id: id });
}
export function handleGoToPortfolio(navigation) {
    navigation.navigate("PortfolioScreen");
}