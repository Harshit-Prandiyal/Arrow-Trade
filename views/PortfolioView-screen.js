import { View , Text,StyleSheet } from "react-native";

export default function PortfolioViewScreen(){
    return (
        <View style={styles.container} >
            <Text> portfolio screen </Text>
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