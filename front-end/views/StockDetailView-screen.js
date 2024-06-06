import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VictoryChart,
  VictoryTheme,
  VictoryCandlestick,
  VictoryAxis,
} from "victory-native";
import { addToPortfolio, updatePortfolio } from "../models/PortfolioSlice";
//style imports
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
//my imports
import { convertDateToId } from "../controllers/StockDetail-controller";
import MyText from "../components/MyText";
// api requests
import { fetchChartData } from "../util/chartData";
import { fetchHOLCData } from "../util/ohlcData";
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message'

const actionType = {
  buy: "buy",
  sell: "sell",
  hold: "hold"
};
function StatItem({ name, value, isPrice }) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 15 }}>
      <View style={{ marginRight: 5 }}>
        <MyText isBold={true} size={16}>
          {name}
        </MyText>
      </View>
      {isPrice ? (
        <MyText size={16}>${value}</MyText>
      ) : (
        <MyText size={16}>{value}</MyText>
      )}
    </View>
  );
}
function MyChart({ chartData }) {
  chartData.reverse();
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ x: 15, y: 10 }}
      alignment="middle"
    >
      <VictoryAxis tickFormat={(x) => `${x.substring(0, 3)}`} />
      <VictoryAxis
        dependentAxis
        tickFormat={(t) => (t > 1000 ? `$${t / 1000}k` : `$${t.toFixed(0)}`)}
      />
      <VictoryCandlestick
        candleColors={{ positive: Colors.Darkblue, negative: Colors.pink }}
        data={chartData}
      />
    </VictoryChart>
  );
}
function addComma(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Button = ({ children, color, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginHorizontal: 10,
      }}
      onPress={onPress}
    >
      <View style={{ marginHorizontal: 30 }}>
        <MyText isBold={true} color={"#fff"} size={16}>
          {children}
        </MyText>
      </View>
    </TouchableOpacity>
  );
};
export default function StockDetailViewScreen({ route, navigation }) {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({});
  const [loading , setLoading] = useState(false);
  const { id , current_price } = route.params;
  console.log(current_price);
  const userBalance = useSelector((state) => state.auth.user.balance);
  const dispatch = useDispatch();
  // functions 
  const handleAddToPortfolio = async (type) => {
    const userBalanceNum = parseFloat(userBalance);
    const currentPriceNum = parseFloat(current_price);
    if (type === actionType.buy && userBalanceNum < currentPriceNum) {
      const errorMsg = `Not enough balance to buy ${id}`;
      Toast.show({
        type: 'error',
        text1: 'Insufficient Balance',
        text2: errorMsg
      });
      return;
    }
    dispatch(
      updatePortfolio({ stockId: id, current_price, actionType: type })
    );
  };
  useEffect(() => {
    try {
      (async () => {
        //console.log(id);
        setLoading(true);
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Request timed out'));
          }, 5000); // Timeout duration in milliseconds (e.g., 5000ms for 5 seconds)
        });
        const chartDatPromise =  fetchChartData(id);
        const data = await Promise.race([chartDatPromise, timeoutPromise]);
        setLoading(false);
        if (data) {
          const chartData = convertDateToId(data);
          setChartData(chartData);
          //console.log(chartData);
        }
      })();
    } catch (err) {
      console.log(err);
      setLoading(false);
      const errorMsg = `error fetching ${id} data from Exchange`;
      Toast.show({
        type: 'error',
        text1: 'Error Occured',
        text2: errorMsg
      });
    }finally{
      setLoading(false);
    }
    try {
      (async () => {
        //console.log(id);
        const data = await fetchHOLCData(id);
        if (data) {
          setStats(data);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const wentUp = stats.price_change_percentage_24h >= 0 ? true : false;
  const price_change_percentage_24h =
    stats.price_change_percentage_24h >= 0
      ? stats.price_change_percentage_24h
      : stats.price_change_percentage_24h * -1;
  const image = stats.image
    ? stats.image
    : "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579";
  const symbol = stats.symbol ? stats.symbol : "BTC";
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
      <Spinner
          visible={loading}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 80,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: image,
              }}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <View>
              <MyText isBold={true} size={16}>
                {symbol.toUpperCase()}
              </MyText>
              <MyText color={Colors.lightgray}>{stats.name}</MyText>
            </View>
          </View>
          <View
            style={{
              borderRadius: 12,
              height: 20,
              backgroundColor: wentUp ? Colors.green69 : Colors.pink,
              width: 68,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ margin: 2, marginRight: 4 }}>
              <Ionicons
                name={wentUp ? "caret-up-outline" : "caret-down-outline"}
                size={12}
                color="white"
              />
            </View>
            <MyText isBold={true} color={"white"} size={12}>
              {price_change_percentage_24h.toFixed(2)}%
            </MyText>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 30,
          }}
        >
          <TouchableOpacity>
            {chartData.length !== 0 ? (
              <MyChart chartData={chartData} />
            ) : (
              <Text>loading</Text>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            marginLeft: 40,
          }}
        >
          <MyText isBold={true} size={22}>
            Statistics
          </MyText>
        </View>
        <View
          style={{
            width: 300,
            backgroundColor: Colors.whitishgrey,
            marginHorizontal: 30,
            marginTop: 20,
            padding: 20,
            borderRadius: 24,
          }}
        >
          <StatItem
            name="High"
            value={stats.high ? addComma(stats.high.toFixed(3)) : 227.29}
            isPrice={true}
          />
          <StatItem
            name="Low"
            value={stats.low ? addComma(stats.low.toFixed(3)) : 224.1}
            isPrice={true}
          />

          <StatItem
            name="Total Volume"
            value={stats.volume ? addComma(stats.volume) : 1461009}
          />
          <StatItem
            name="Market Cap"
            value={stats.market_cap ? addComma(stats.market_cap) : 43419000000}
            isPrice={true}
          />
        </View>
        <View style={styles.row}>
          <Button
            color={Colors.Darkblue}
            onPress={() => handleAddToPortfolio(actionType.buy)}
          >
            Buy
          </Button>
          <Button
            color={Colors.pink}
            onPress={() => handleAddToPortfolio(actionType.sell)}
          >
            Sell
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Eudoxus-Sans-Bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 120,
  },
});
