import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
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
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

const Chat = ({ route, navigation, db, storage, isConnected }) => {
  // Assigning params to variables
  const { name, color, userID } = route.params;

  // Create messages array for holding list of messages
  const [messages, setMessages] = useState([]);

  let soundObject = null;
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
      // Cleanup is done at the end by unloading all the media from memory
      if (unsubMessages) unsubMessages();
      if (soundObject) soundObject.unloadAsync();
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
    // newMessages is usually an object with a key value pair like {audio: soundURL}
    // there is a useEffect that contains an onSnapshot function that is continuously adding _id, createdAt, and user to the messages
    if (isConnected === true) {
      addDoc(collection(db, "messages"), newMessages[0]);
    } else if (isConnected === false) {
      Alert.alert("No connection");
    }
  };

  // renderBubble function takes the messages in GiftedChat component and updates the bubble colors based on left or right
  // props represents an individual message, not the entire "messages" array.
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

  const renderCustomActions = (props) => {
    return (
      <CustomActions
        onSend={onSend}
        userID={userID}
        storage={storage}
        {...props}
      />
    );
  };
  // CustomViews go inside the bubble and using if statements control whether to return the MapView
  const renderCustomView = (props) => {
    // currentMessage is specific to Gifted Chat, you cannot use another constant
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 300, height: 200 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }

    if (currentMessage.audioClip) {
      return (
        <View>
          {/* <View {...props}> */}
          <TouchableOpacity
            style={{ backgroundColor: "#FF0", borderRadius: 10, margin: 5 }}
            onPress={async () => {
              if (soundObject) soundObject.unloadAsync();
              const { sound } = await Audio.Sound.createAsync({
                uri: props.currentMessage.audioClip,
              });
              soundObject = sound;
              await sound.playAsync();
            }}
          >
            <Text style={{ textAlign: "center", color: "black", padding: 5 }}>
              Play Sound
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  // const renderMessageAudio = (props) => {
  //   return (
  //     <View {...props}>
  //       <TouchableOpacity
  //         style={{ backgroundColor: "#FF0", borderRadius: 10, margin: 5 }}
  //         onPress={async () => {
  //           if (soundObject) soundObject.unloadAsync();
  //           const { sound } = await Audio.Sound.createAsync({
  //             uri: props.currentMessage.audio,
  //           });
  //           soundObject = sound;
  //           await sound.playAsync();
  //         }}
  //       >
  //         <Text style={{ textAlign: "center", color: "black", padding: 5 }}>
  //           Play Sound
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {/* GiftedChat component with array of messages, renderBubble setttings, onSend function, and user id */}
      <GiftedChat
        messages={messages}
        // renderBubble is just to customize the bubble stylings
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userID, name: name }}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        // renderMessageAudio={renderMessageAudio}
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
