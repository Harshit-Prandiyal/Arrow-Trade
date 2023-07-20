import { useEffect, useState } from "react";
import { View, Text, StyleSheet ,TouchableOpacity} from "react-native";
import { VictoryChart, VictoryTheme, VictoryCandlestick ,VictoryAxis} from "victory-native";


//my imports
import { convertDateToId } from "../controllers/StockDetail-controller";
import { Colors } from "../constants/colors";
// api calls
import { fetchChartData } from "../util/chartData";

function MyChart({ chartData }) {
  chartData.reverse();
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ x: 15, y: 10 }}
      alignment="middle"
    >
      <VictoryAxis tickFormat={(x) => `${x.substring(0, 3)}`} />
      <VictoryAxis dependentAxis tickFormat={(t) =>  t>1000 ? `$${t / 1000 }k` : `$${t.toFixed(0)}`} />
      <VictoryCandlestick
        candleColors={{ positive: Colors.Darkblue, negative: Colors.pink }}
        data={chartData}
      />
    </VictoryChart>
  );
}

export default function StockDetailViewScreen({ route, navigation }) {
  const [chartData, setChartData] = useState([]);
  const { id } = route.params;
  useEffect(() => {
    try {
      (async () => {
        console.log(id);
        const data = await fetchChartData(id);
        if (data) {
          const chartData = convertDateToId(data);
          setChartData(chartData);
          console.log(chartData);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text> {id}Detail screen </Text>
      <View style={{flex:1,marginHorizontal:30 , flexShrink:1,justifyContent:'center',alignItems:'center'}} >
      <TouchableOpacity>
        { chartData.length!==0 ? <MyChart chartData={chartData} /> : <Text>loading</Text> }
      </TouchableOpacity>
      </View>
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
