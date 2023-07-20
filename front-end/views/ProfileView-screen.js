import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { VictoryChart, VictoryTheme, VictoryCandlestick ,VictoryAxis} from "victory-native";

import { Colors } from "../constants/colors";
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
function MyChart({chartData}){
  chartData.reverse();
  return <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 15,y:10 }} alignment='middle' >
        <VictoryAxis  tickFormat={x => `${x.substring(0,3)}`}/>
          <VictoryAxis dependentAxis  tickFormat={t => `$${t}`} />
          <VictoryCandlestick
            candleColors={{ positive: Colors.Darkblue, negative: Colors.pink }}
            data={chartData}
          />
        </VictoryChart>
}
export default function ProfileViewScreen() {
  return (
    <View style={styles.container}>
      <Text> profile screen </Text>
      <TouchableOpacity>
        <MyChart chartData={chartData} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Eudoxus-Sans-Bold",
  },
});
