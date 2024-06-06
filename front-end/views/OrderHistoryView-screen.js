import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Colors } from "../constants/colors";
import { useSelector } from "react-redux";
import { fetchAiResponse } from "../util/askAi";

export default function OrderHistoryViewScreen({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Hi ${user.name} ,I am your trading assistant`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Artifical Intelligence",
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const messageToSend = newMessages[0].text;

    setLoading(true);
    try {
      const response = await fetchAiResponse(messageToSend);
      if(!response){
        const receivedMessage = {
          _id: Math.random().toString(36).substring(7),
          text: "There was some error with Gemini api , try again later",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Artifical Intelligence',
          },
        };
  
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [receivedMessage])
        );
        return;
      }
      const receivedMessage = {
        _id: Math.random().toString(36).substring(7),
        text: response.answer,
        createdAt: new Date(),
        user: {
          _id: 2, // Assuming 2 is the ID for your bot
          name: 'Artifical Intelligence',
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [receivedMessage])
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  return (
    <View style={styles.container} >
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    backgroundColor: "#fff",
    paddingBottom:100,
  },
  title: {
    fontFamily: "Eudoxus-Sans-Bold",
  },
});
