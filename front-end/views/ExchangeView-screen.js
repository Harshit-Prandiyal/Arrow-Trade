import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "../components/MyText";
import { Colors } from "../constants/colors";
import { fetchBasicData } from "../util/basicData";
import { fetchCoinList } from "../util/coinList";
import { Ionicons } from "@expo/vector-icons";
import { addToPortfolio, updatePortfolio } from "../models/PortfolioSlice";
import { addToWatchlist, updateWatchlist } from "../models/WatchlistSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
function DisplayStockData({ item, onLongPress,onPress }) {
  const imageUrl = item.image
    ? item.image
    : "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579";
  const wentUp = item.price_change_percentage_24h >= 0 ? true : false;
  const price_change_percentage_24h =
    item.price_change_percentage_24h > 0
      ? item.price_change_percentage_24h
      : -1 * item.price_change_percentage_24h;
  return (
    <TouchableOpacity
      onLongPress={() => {
        onLongPress(item.id, item.current_price);
      }}
      onPress={()=>onPress(item.id,item.current_price)}
    >
      <View
        style={{
          height: 100,
          marginLeft: 20,
          marginRight: 20,
          width: "100%",
          borderRadius: 10,
          marginVertical: 5,
          padding: 5,
          backgroundColor: Colors.whitishgrey,
        }}
      >
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: "row", width: "90%", flex: 1 }}>
            <Image
              style={{ ...styles.image, height: 40, width: 40, marginLeft: 5 }}
              source={{
                uri: imageUrl,
              }}
            />
            <View style={{ flexShrink: 1, marginLeft: 20 }}>
              <MyText isBold={true}>{item.symbol.toUpperCase()}</MyText>
              <MyText
                isBold={true}
                color={Colors.lightgray}
                extrastyles={{ flexShrink: 1 }}
              >
                {item.name}
              </MyText>
            </View>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <MyText isBold={true}>${item.current_price}</MyText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Ionicons
                name={wentUp ? "caret-up-outline" : "caret-down-outline"}
                size={7}
                color={wentUp ? Colors.green69 : Colors.pink}
              />
              <MyText
                isBold={true}
                size={10}
                color={wentUp ? Colors.green69 : Colors.pink}
              >
                ${price_change_percentage_24h.toFixed(2)}%
              </MyText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ExchangeViewScreen({navigation}) {
  const [id, setId] = useState("");
  const [coinList, setCoinList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading , setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const userId = useSelector((state) => state.auth.user._id);
  const userBalance = useSelector((state) => state.auth.user.balance);
  const dispatch = useDispatch();

  function handleSearchClick(val) {
    if (val === "") {
      setFilteredList(coinList);
      return;
    }
    const filterBySearch = coinList.filter((item) => {
      if (item.name.toLowerCase().includes(val.toLowerCase())) {
        return item;
      }
    });
    setFilteredList(filterBySearch);
  }
  const handleRemoveFromWatchlist = async(id) => {
    setLoading(true);
    await dispatch(updateWatchlist({ stockId : id , actionType : "remove" }));
    setLoading(false);
  }
  const handleAddToWatchlist = async (id) => {
    dispatch(updateWatchlist({ stockId : id , actionType : "add" }));
  };
  function handleCoinBuy(id, current_price) {
    const str = `Add ${id} ?`;
    Alert.alert(str, `Select appropriate option :- `, [
      {
        text: "Cancel",
        onPress: () => console.log("cancelled"),
        style: "cancel",
      },
      {
        text: "Add To Watchlist",
        style: "destructive",
        onPress: () => handleAddToWatchlist(id),
      },
      {
        text: "Remove From Watchlist",
        style: "destructive",
        onPress: () => handleRemoveFromWatchlist(id),
      },
    ]);
  }
  useEffect(() => {
    try {
      (async () => {
        setLoading(true);
        const data = await fetchCoinList();
        setLoading(false);
        if (data) {
          setCoinList(data);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (coinList.length > 0) {
      handleSearchClick(searchVal);
    }
  }, [coinList, searchVal]);
  return (
    <View style={styles.container}>
      <Spinner
          visible={loading}
        />
      <SafeAreaView
        style={{ alignItems: "flex-start", width: "100%", marginLeft: 20 }}
      >
        <MyText isBold={true} size={22}>
          Select Coins
        </MyText>
      </SafeAreaView>
      <View style={{ width: "100%" }}>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <TextInput
            style={styles.input}
            onChangeText={setSearchVal}
            value={searchVal}
            placeholder="Search company , coin..."
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredList.map((item, index) => {
          const uniqueKey = index || item.id;
          return (
            <DisplayStockData
              key={uniqueKey}
              item={item}
              onLongPress={(id, current_price) => handleCoinBuy(id, current_price)}
              onPress ={ (id,current_price)=> navigation.navigate("StockDetailScreen", { id ,current_price })}
            />
          );
        })}
      </ScrollView>
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
  input: {
    height: 60,
    margin: 12,
    borderWidth: 2,
    borderRadius: 24,
    borderColor: Colors.purpleblue,
    padding: 10,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    width: "90%",
    marginTop: 30,

    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
