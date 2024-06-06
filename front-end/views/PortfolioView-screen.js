import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
//style imports
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
//component imports
import MyText from "../components/MyText";
import { ScrollView } from "react-native";
import { handleGoToStockDetail } from "../controllers/Portfolio-controller";
///api requests
import { fetchBasicData } from "../util/basicData";
import { useSelector } from "react-redux";
import { fetchPastPrices } from "../util/pastPrices";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from 'react-native-toast-message'
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

function Gains({ children, value, isGain }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View
        style={{
          ...styles.gains,
          backgroundColor: isGain ? Colors.Darkblue : Colors.pink,
        }}
      >
        <Ionicons
          name={isGain ? "trending-up" : "trending-down"}
          size={22}
          color="white"
        />
      </View>
      <View>
        <MyText isBold={true} color={Colors.lightgray} size={14}>
          {children}
        </MyText>
        <MyText isBold={true} size={16}>
          ${value}
        </MyText>
      </View>
    </View>
  );
}

function aggregatePrices(data) {
  // Step 1: Make a copy of the first sub-array
  console.log(data);
  let aggregated = data[0].map((obj) => ({ ...obj }));

  // Step 2: Iterate over the remaining sub-arrays
  for (let i = 1; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      aggregated[j].y += data[i][j].y;
    }
  }

  // Step 3: Round the y values to one decimal place
  aggregated = aggregated.map((obj) => ({
    ...obj,
    y: Math.round(obj.y * 10) / 10,
  }));

  // Step 4: Extract labels and data
  const labels = aggregated.map((obj) => obj.x);
  const dataValues = aggregated.map((obj) => obj.y);

  // Step 5: Return the object with labels and data
  return {
    labels: labels,
    data: dataValues,
  };
}
const MyPieChart = ({ myPortfolio }) => {
  // List of colors for the pie chart
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#E7E9ED",
  ];

  const chartData = myPortfolio.map((item, index) => ({
    name: item.id,
    population: item.qty * item.price,
    color: colors[index % colors.length],
    legendFontColor: "#7F7F7F",
    legendFontSize: 13,
  }));
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <PieChart
        data={chartData}
        width={screenWidth - 30}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        avoidFalseZero
      />
    </View>
  );
};
function ChartKitch({ xaxis, labels }) {
  // const labels = ["January", "February", "March", "April", "May", "June"];
  // const xaxis = [20, 45, 28, 80, 99, 43];
  return (
    <LineChart
      data={{
        labels: labels,
        datasets: [
          {
            data: xaxis,
          },
        ],
      }}
      width={Dimensions.get("window").width - 20} // from react-native
      height={220}
      yAxisLabel="$"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        fillShadowGradient: "transparent",
        fillShadowGradientOpacity: 0.5,
        fillShadowGradientFrom: Colors.Darkblue,
        fillShadowGradientTo: Colors.lightblue,
        decimalPlaces: 1, // optional, defaults to 2dp
        color: (opacity = 1) => Colors.Darkblue, // color of the line chart
        labelColor: (opacity = 1) => `black`,
        style: {
          borderRadius: 8,
        },
        propsForDots: {
          r: "3",
          strokeWidth: "2",
          stroke: Colors.Darkblue,
        },
        propsForBackgroundLines: {
          //strokeDasharray: '', // solid background lines
          strokeWidth: 1,
          stroke: "lightgrey",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      onDataPointClick={(data) => {
        // TODO: show price on data point click
      }}
    />
  );
}
export default function PortfolioViewScreen({ navigation }) {
  const [chartData, setChartData] = useState();
  const [loading, setLoading] = useState(false);
  const myPortfolio = useSelector((state) => state.MyPortfolio);
  const userData = useSelector((state) => state.auth.user);
  useEffect(() => {
    const getPrices = async () => {
      try {
        setLoading(true);
        const chartIds = myPortfolio.map((item) => item.id);
        // Timeout promise
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Request timed out'));
          }, 10000); // Timeout duration in milliseconds (e.g., 5000ms for 5 seconds)
        });
        // Fetch past prices promise
        const pastPricesPromise = fetchPastPrices(chartIds);
        // Race between promises
        const data = await Promise.race([pastPricesPromise, timeoutPromise]);
        setLoading(false);
        if (!data) return;
        console.log(data,'past prices');
        const chartData = aggregatePrices(data);
        // console.log(chartData);
        setChartData(chartData);
      } catch (error) {
        setChartData(null);
        setLoading(false);
        console.log(error,'error fetching past prices');
        Toast.show({
          type: 'error',
          text1: 'Error Occured',
          text2: 'error fetching Weekly portfolio trend'
        });
      }
    };

    getPrices();
  }, []);

  const handleStockDetailPress = (id) => {
    handleGoToStockDetail(navigation, id);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spinner visible={loading} />
      {/** portfolio headinng + gains and losses starts */}
      <View style={styles.headerContainer}>
        <MyText isBold={true} size={20}>
          Portfolio
        </MyText>
        <Ionicons name="grid-outline" size={22} color="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 7,
        }}
      >
        <Gains isGain={true} value={userData.totalGain.toFixed(2)}>
          Total Gains
        </Gains>
        <View style={styles.divider}></View>
        <Gains isGain={false} value={userData.totalLoss.toFixed(2)}>
          Total Losses
        </Gains>
      </View>
      {/** Header section with gains and losses ends */}
      <View style={styles.scrollContainer}>
        <View
          style={{
            flex: 1,
            widht: "100%",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MyText isBold={true} size={18} color={"black"}>
            Weekly Portfolio Trend
          </MyText>
          {chartData && (
            <ChartKitch xaxis={chartData.data} labels={chartData.labels} />
          )}
          {(chartData===null) && (
            <View
              style={{
                flex:1,
                height: 220,
                width: "80%",
                backgroundColor: Colors.darkishwhite,
              }}
            >
            </View>
          )}
        </View>
        <View style={{ marginBottom: 120, width: "95%", alignItems: "center" }}>
          <View
            style={{
              alignItems: "center",
              width: "100%",
              marginBottom: 10,
            }}
          >
            <MyText isBold={true} size={18} color={"black"}>
              Portfolio Distribution
            </MyText>
          </View>
          {myPortfolio && <MyPieChart myPortfolio={myPortfolio} />}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F3FBED",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  gains: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: Colors.Darkblue,
    marginRight: 10,
  },
  headerContainer: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  divider: {
    borderWidth: 1,
    marginHorizontal: 10,
    height: 40,
    borderColor: Colors.lightgray,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    marginTop: 30,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  image: {
    resizeMode: "contain",
    margin: 3,
    marginRight: 20,
  },
});
