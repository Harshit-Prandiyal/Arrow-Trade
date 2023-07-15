import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLegend,
  VictoryTooltip,
  VictoryLabel,
} from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";

import { Colors } from "../constants/colors";

export default function ProfileViewScreen() {
  return (
    <View style={styles.container}>
      <Text> profile screen </Text>
      <TouchableOpacity>
      <VictoryChart theme={VictoryTheme.material} alignment='middle' >
        <VictoryAxis  />
        <VictoryAxis
          dependentAxis
          //tickFormat specifies how ticks should be displayed
          tickFormat={(x) => `Rs.${x / 1000}k`}
        />
        <VictoryBar
          style={{ data: { fill: Colors.purpleblue } }}
          data={[
            { x: "Mon", y: 1000 },
            { x: "Tue", y: 2000 },
            { x: "Wed", y: 5000 },
            { x: "Thu", y: 1500 },
            { x: "Fri", y: 2750 },
            { x: "Sat", y: 3400 },
            { x: "Sun", y: 3500 },
          ]}
          labels={({ datum }) => ``}
          cornerRadius={10}
          barWidth={26}
          barRatio={0.7}
          events={[{
            target: "data",
            eventHandlers: {
              onPressIn: () => {
                return [
                  {
                    target: "data",
                    mutation: (props) => {
                      const fill = props.style && props.style.fill;
                      return fill ===  Colors.pink ? null : { style: { fill: Colors.pink } };
                    }
                  },
                  {
                    target: "labels",
                    mutation: (props) => {
                      return props.text === `Rs.${props.datum.y / 1000}k` ?
                        "" : { text: `Rs.${props.datum.y / 1000}k` }
                    }
                  },
                ];
              }
            }
          }]}
        />
      </VictoryChart>
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
