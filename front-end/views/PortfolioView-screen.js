import { View, Text, StyleSheet,TouchableOpacity,Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
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

const portfolioData = [
  {
    key: 1,
    ticker: "FB",
    name: "Facebook, Inc",
    price: 365.51,
    profit: 0.59,
  },
  {
    key: 2,
    ticker: "AAPL",
    name: "Apple, Inc",
    price: 149.62,
    profit: 0.38,
  },
  {
    key: 3,
    ticker: "AMZN",
    name: "Amazon, Inc",
    price: 400.31,
    profit: 100,
  },
  {
    key: 4,
    ticker: "AMZN",
    name: "Amazon, Inc",
    price: 400.31,
    profit: 100,
  },
  {
    key: 5,
    ticker: "AMZN",
    name: "Amazon, Inc",
    price: 400.31,
    profit: 100,
  },
];
function DisplayStockData({ item }) {
  return (
    <TouchableOpacity>
      <View
      style={{
        height: 100,
        marginLeft: 20,
        marginRight: 20,
        width:'100%',
        borderRadius: 10,
        marginVertical: 5,
        padding: 5,
        backgroundColor: Colors.whitishgrey,
      }}
    >
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: "row",width:'90%',flex:1}}>
          <Image
            style={{ ...styles.image, height: 40, width: 40,marginLeft:5, }}
            source={{
              uri: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
            }}
          />
          <View style={{ flexShrink: 1 ,}}>
            <MyText isBold={true}>{item.ticker}</MyText>
            <MyText
              isBold={true}
              color={Colors.lightgray}
              extrastyles={{ flexShrink: 1 }}
            >
              {item.name}
            </MyText>
          </View>
        </View>
        <View style={{alignItems:'center',justifyContent:'center'}} >
          <MyText isBold={true} >${item.price}</MyText>
          <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'flex-end' }} >
          <Ionicons name="triangle" size={7} color={Colors.pink} />
          <MyText isBold={true} size={10} color={Colors.pink} >$0.23%</MyText>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
}


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
function MyChart(){
  return <VictoryChart theme={VictoryTheme.material} alignment='middle' domainPadding={{ x: 20,y:10 }} >
  <VictoryAxis  />
  <VictoryAxis
    dependentAxis
    //tickFormat specifies how ticks should be displayed
    tickFormat={(x) => `$.${x / 1000}k`}
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
}
export default function PortfolioViewScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <TouchableOpacity>
      <MyChart />
      </TouchableOpacity>
      
      <View style={{marginBottom:120, width: "95%" ,alignItems:'center'}} > 
      <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom:10,
          }}
        >
          <MyText isBold={true} size={18} color={"black"} >Top Stocks</MyText>
          <TouchableOpacity>
            <MyText isBold={true} size={16} color={Colors.pink} >View all</MyText>
          </TouchableOpacity>
        </View>
          { (portfolioData).map( (item)=>{
              return <DisplayStockData item={item} />
          } )   }
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
    alignItems:'center',
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
