import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  // Assigning params to variables
  const { name, color, userID } = route.params;

  // Create messages array for holding list of messages
  const [messages, setMessages] = useState([]);

  // useEffect to setup initial name of the chat room
  useEffect(() => {
    navigation.setOptions({ title: "Chat Room" });

    let unsubMessages;

    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      // onSnapshot is like an event listener looking for changes in your db collection named "messages", if triggered, will run the function
      unsubMessages = onSnapshot(
        query(collection(db, "messages"), orderBy("createdAt", "desc")),
        (docs) => {
          let newMessages = [];
          // For each document, it will push the message with id, data, and createdAt.
          docs.forEach((doc) => {
            newMessages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis()),
            });
          });
          cacheMessages(newMessages);
          setMessages(newMessages);
        }
      );
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cacheMessages = async (messageToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messageToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };
  // Use pass callback function into setMessages to take current array and append new messages to it
  const onSend = (newMessages) => {
    if (isConnected === true) {
      addDoc(collection(db, "messages"), newMessages[0]);
    } else if (isConnected === false) {
      Alert.alert("No connection");
    }
  };

  // renderBubble function takes the messages in GiftedChat component and updates the bubble colors based on left or right position
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {/* GiftedChat component with array of messages, renderBubble setttings, onSend function, and user id */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userID, name: name }}
      />

      {/* Conditional operator add the KeyboardAvoidingView component if mobile OS used is an Andriod */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
