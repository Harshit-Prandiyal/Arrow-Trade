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

//style imports
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
//my imports
import { convertDateToId } from "../controllers/StockDetail-controller";
import MyText from "../components/MyText";
// api requests
import { fetchChartData } from "../util/chartData";
import { fetchHOLCData } from "../util/ohlcData";
const chartData = [
  {
    x: "Fri Jul 14 2023",
    open: 24.38,
    high: 30.05,
    low: 24.38,
    close: 28.07,
  },
  {
    x: "Sat Jul 15 2023",
    open: 28.18,
    high: 28.99,
    low: 26.1,
    close: 28.06,
  },
  {
    x: "Sun Jul 16 2023",
    open: 27.79,
    high: 28.4,
    low: 27.03,
    close: 28.4,
  },
  {
    x: "Mon Jul 17 2023",
    open: 28.14,
    high: 28.17,
    low: 27.05,
    close: 27.24,
  },
  {
    x: "Tue Jul 18 2023",
    open: 26.94,
    high: 26.94,
    low: 25.08,
    close: 25.43,
  },
  {
    x: "Wed Jul 19 2023",
    open: 25.47,
    high: 26.47,
    low: 25.26,
    close: 26.09,
  },
  {
    x: "Thu Jul 20 2023",
    open: 26.34,
    high: 27.26,
    low: 26.26,
    close: 27.04,
  },
];
const HeaderWithBackButton = () => {
  return (
    <SafeAreaView
      style={{
        width: "95%",
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
        alignItems: "center",
      }}
    >
      <TouchableOpacity style={{ marginLeft: 25 }}>
        <Ionicons name="chevron-back-circle-outline" size={30} color="black" />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
        }}
      >
        <MyText isBold={true} size={20}>
          Coin Detail
        </MyText>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "blue",
        }}
      ></View>
    </SafeAreaView>
  );
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

export default function StockDetailViewScreen({ route, navigation }) {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({});
  const { id } = route.params;
  useEffect(() => {
    try {
      (async () => {
        //console.log(id);
        const data = await fetchChartData(id);
        if (data) {
          const chartData = convertDateToId(data);
          setChartData(chartData);
          //console.log(chartData);
        }
      })();
    } catch (err) {
      console.log(err);
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
  const wentUp = stats.price_change_percentage_24h>=0 ? true : false;
  const price_change_percentage_24h = stats.price_change_percentage_24h>=0
    ? stats.price_change_percentage_24h
    : stats.price_change_percentage_24h*-1;
  const image = stats.image
    ? stats.image
    : "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579";
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
              {stats.symbol.toUpperCase()}
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
          marginBottom: 120,
        }}
      >
        <StatItem
          name="High"
          value={stats.high ? stats.high : 227.29}
          isPrice={true}
        />
        <StatItem
          name="Low"
          value={stats.low ? stats.low : 224.1}
          isPrice={true}
        />

        <StatItem
          name="Total Volume"
          value={stats.volume ? stats.volume : 1461009}
        />
        <StatItem
          name="Market Cap"
          value={stats.market_cap ? stats.market_cap : 43419000000}
          isPrice={true}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Eudoxus-Sans-Bold",
  },
});
