//components imports
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//style imports
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
//my imports
import { Colors } from "../constants/colors";
import Portfolio from "../components/PortfolioItem";
import YourWatchList from "../components/YourWatchList";
import MyText from "../components/MyText";
import { ProgressChart } from "react-native-chart-kit";
import {
  handleGoToStockDetail,
  handleGoToPortfolio,
  joinAndRemoveDuplicates,
  filterResponseByPortfolio,
} from "../controllers/Home-controller";
import { updateWatchlist } from "../models/WatchlistSlice";
///api requests
import { fetchBasicData } from "../util/basicData";
import { useSelector, useDispatch } from "react-redux";
import { Dimensions } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message'

// portfolioChange  = {"currentPortfolioValue": 7835.200000000001, "initialPortfolioValue": 7935.043306837688, "portfolioChangePercentage": -1.2582578692626996, "totalChange": -99.84330683768835}
const PercentChange = ({ value }) => {
  const wentUp = value < 0 ? false : true;
  return (
    <View
      style={{
        borderRadius: 12,
        height: 20,
        backgroundColor: "white",
        width: 58,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: 10,
        marginTop: 6,
      }}
    >
      <View style={{ margin: 2, marginRight: 4 }}>
        <Ionicons
          name={wentUp ? "caret-up-outline" : "caret-down-outline"}
          size={12}
          color={wentUp ? Colors.green69 : Colors.pink}
        />
      </View>
      <MyText color={wentUp ? Colors.green69 : Colors.pink} size={10} isBold={true}>
        {value}%
      </MyText>
    </View>
  );
};
const Header = ({ name }) => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Image
            style={styles.image}
            source={require("../assets/images/avatar.png")}
          />
          <View>
            <MyText isBold={true} size={18} color={"black"}>
              Hi, {name}!
            </MyText>
            <MyText isBold={false} size={14} color={Colors.lightgray}>
              Welcome to Tradebase
            </MyText>
          </View>
        </View>
        <Ionicons name="grid-outline" size={24} color="black" />
      </View>
    </SafeAreaView>
  );
};
const InvestmentPercent = ({ value }) => {
  const ratio = value / 10000;
  const data = {
    data: [ratio],
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        width: 90,
        height: 120,
        borderRadius: 8,
        alignItems: "center",
        paddingTop: 8,
        justifyContent: "flex-start",
      }}
    >
      <ProgressChart
        data={data}
        width={80}
        height={80}
        strokeWidth={16}
        radius={25}
        chartConfig={{
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          style: {
            borderRadius: 8,
          },
          color: (opacity = 1) => `rgba(53, 0, 212, ${opacity})`,
        }}
        hideLegend={true}
      />
      <MyText color={"black"} size={11} isBold={true}>
        {Math.trunc(ratio * 100)}% Invested
      </MyText>
    </View>
  );
};
function calculatePortfolioChange(portfolioData, myPortfolio) {
  if (portfolioData.length === 0) return null;
  let totalChange = 0;
  let initialPortfolioValue = 0;
  let currentPortfolioValue = 0;

  // Create a map of portfolioData for quick lookup by id
  const tickerMap = new Map(portfolioData.map((ticker) => [ticker.id, ticker]));

  // Loop through each item in myPortfolio
  myPortfolio.forEach((item) => {
    const ticker = tickerMap.get(item.id);
    if (ticker) {
      const currentPrice = ticker.current_price;
      const priceChange24h = ticker.price_change_percentage_24h / 100;
      const initialPrice = currentPrice / (1 + priceChange24h);

      const initialInvestment = item.qty * initialPrice;
      const currentInvestment = item.qty * currentPrice;
      const change = currentInvestment - initialInvestment;

      totalChange += change;
      initialPortfolioValue += initialInvestment;
      currentPortfolioValue += currentInvestment;
    }
  });

  const portfolioChangePercentage = (totalChange / initialPortfolioValue) * 100;

  return {
    initialPortfolioValue: initialPortfolioValue,
    currentPortfolioValue: currentPortfolioValue,
    totalChange: totalChange,
    portfolioChangePercentage: portfolioChangePercentage,
  };
}
export default function HomeViewScreen({ navigation }) {
  const [portfolioData, setPortfolioData] = useState([]);
  const [watchlistData, setwatchlistData] = useState([]);
  const [loading , setLoading] = useState(false);
  const [portfolioChange, setPortfolioChange] = useState();
  const user = useSelector((state) => state.auth.user);
  const myPortfolio = useSelector((state) => state.MyPortfolio);
  const myWatchlist = useSelector((state) => state.MyWatchlist);
  const fetchIds = joinAndRemoveDuplicates(myPortfolio, myWatchlist);
  const investmentAmt = myPortfolio.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  console.log(portfolioChange);
  useEffect(() => {
    try {
      (async () => {
        if (fetchIds.length > 0) {
          setLoading(true);
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
              reject(new Error('Request timed out'));
            }, 5000); // Timeout duration in milliseconds (e.g., 5000ms for 5 seconds)
          });
          const dataPromise = fetchBasicData(fetchIds);
          const data = await Promise.race([dataPromise, timeoutPromise]);
          setLoading(false);
          if (data) {
            const yourPortfolio = filterResponseByPortfolio(data, myPortfolio);
            // console.log('Your Portfolio ',yourPortfolio);
            const pj = calculatePortfolioChange(yourPortfolio, myPortfolio);
            setPortfolioChange(pj);
            setPortfolioData(yourPortfolio);
            const yourWatchlist = filterResponseByPortfolio(data, myWatchlist);
            setwatchlistData(yourWatchlist);
          }
        }
      })();
    } catch (err) {
      console.log(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error Occured',
        text2: 'error fetching portfolio data'
      });
    }
  }, [myPortfolio,myWatchlist]);
  const handlePortfolioPress = ({id ,current_price}) => {
    // handleGoToStockDetail(navigation, id ,current_price );
    navigation.navigate("StockDetailScreen", {id , current_price});
  };
  const portfolioViewAllPressHandler = () => {
    handleGoToPortfolio(navigation);
  };
  const dispatch = useDispatch();
  const handleRemoveFromWatchlist = async(id) => {
    setLoading(true);
    await dispatch(updateWatchlist({ stockId : id , actionType : "remove" }));
    setLoading(false);
  }
  const handleAddToWatchlist = async (id) => {
    dispatch(updateWatchlist({ stockId : id , actionType : "add" }));
  };
  function handleCoinBuy(id) {
    const str = `Add ${id} ?`;
    Alert.alert(str, `Select appropriate option :- `, [
      {
        text: "Cancel",
        onPress: () => console.log("cancelled"),
        style: "cancel",
      },
      {
        text: "Add To Watchlist",
        style: "destructive",
        onPress: () => handleAddToWatchlist(id),
      },
      {
        text: "Remove From Watchlist",
        style: "destructive",
        onPress: () => handleRemoveFromWatchlist(id),
      },
    ]);
  }
  return (
    <View style={styles.root}>
      <Spinner
          visible={loading}
        />
      <ScrollView contentContainerStyle={styles.container}>
        {/* top container with hello kits base starts */}
        <Header name={user.name} />
        {/* top container with hello kits base ends */}
        <LinearGradient
          // Button Linear Gradient
          //pink is not pink from colors as opacity is 0.4 not 1, darkblue is same
          colors={["#3500d4", "#f61c7a66"]}
          style={styles.card}
        >
          <View style={{ margin: 20 }}>
            <View style={{ marginBottom: 6 }}>
              <MyText isBold={true} color={Colors.lightgray}>
                Your Total Balance
              </MyText>
            </View>
            {/** total portfolio value and percent channge */}
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <MyText isBold={true} color={"white"} size={26}>
                ${user.balance.toLocaleString()}
              </MyText>
            </View>
            {/** total portfolio value change */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: 10,
              }}
            >
              <View>
                <MyText isBold={true} color={Colors.lightgray}>
                  Total Investment
                </MyText>
                <MyText isBold={true} color={"white"} size={18}>
                  ${investmentAmt.toLocaleString()}
                </MyText>
              </View>
              {portfolioChange && (
                <PercentChange
                  value={portfolioChange.portfolioChangePercentage.toFixed(2)}
                />
              )}
            </View>
            {/** corner rounded container with top performing stocks TODO */}
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <InvestmentPercent value={investmentAmt} />
          </View>
        </LinearGradient>
        {/* PORTFOLIO */}
        <Portfolio
          data={portfolioData}
          onPress={handlePortfolioPress}
          viewAllPressHandler={portfolioViewAllPressHandler}
        />
        {/* Your Washlist */}
        <YourWatchList data={watchlistData} onPress={handlePortfolioPress} onLongPress={handleCoinBuy} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    padding: 5,
  },

  image: {
    resizeMode: "contain",
    margin: 3,
    marginRight: 20,
  },
  card: {
    height: 200,
    width: "95%",
    borderRadius: 24,
    margin: 25,
    flexDirection: "row",
  },
  title: {
    fontFamily: "Eudoxus-Sans-Bold",
  },
});
