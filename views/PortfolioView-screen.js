import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
//style imports
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
//component imports
import MyText from "../components/MyText";

function Gains({children,value,isGain}){
  return (
    <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
      <View style={{...styles.gains,backgroundColor: isGain ? Colors.Darkblue : Colors.pink}} >
      <Ionicons name={  isGain? "trending-up": "trending-down"} size={22} color="white" />
    </View>
    <View>
    <MyText isBold={true} color={Colors.lightgray}  size={14} >{children}</MyText>
    <MyText isBold={true} size={16} >${value}</MyText>
    </View>
    </View>
  );
}

export default function PortfolioViewScreen() {
  return (
    <View style={styles.container}>
      {/** portfolio headinng + gains and losses starts */}
      <View style={styles.headerContainer}>
        <MyText isBold={true} size={20}>Portfolio</MyText>
        <Ionicons name="grid-outline" size={22} color="black" />
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:7,}} >
      <Gains isGain={true} value={800.45} >Total Gains</Gains>
      <View style={styles.divider} ></View>
      <Gains isGain={false} value={800} >Total Losses</Gains>
      </View>
      {/** Header section with gains and losses ends */}
      <View style={styles.scrollContainer} >

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3FBED",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  gains:{
    height:50,
    width:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:Colors.Darkblue,
    marginRight:10,
  },
  headerContainer: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop:15,
  },
  divider:{
    borderWidth:1,
    marginHorizontal:10,
    height:40,
    borderColor:Colors.lightgray,
  },
  scrollContainer:{
    flex:1,
    backgroundColor:'white',
    width:'100%',
    marginTop:30,
    borderTopRightRadius:32,
    borderTopLeftRadius:32,
  },
});
