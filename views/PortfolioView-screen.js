import { View, Text, StyleSheet } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryArea,
} from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
export default function PortfolioViewScreen() {
  return (
    <View style={styles.container}>
      <Text> portfolio screen </Text>
      <VictoryChart>
      <Defs>
          <LinearGradient id="gradientStroke" >
            <Stop offset="0%" stopColor="white" />
            <Stop offset="100%" stopColor="#1DCC98" />
          </LinearGradient>
        </Defs>
        <VictoryArea
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 6 },
          ]}
          style={{
            data: {
              fill: 'url(#gradientStroke)',
            }
          }}
        />
      </VictoryChart>
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
