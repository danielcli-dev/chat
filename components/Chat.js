import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  // Assigning params to variables
  const { name } = route.params;
  const { color } = route.params;
  const { userID } = route.params;

  // Create messages array for holding list of messages
  const [messages, setMessages] = useState([]);

  // const addMessage = async (newMessage) => {
  //   const newMessageRef = await addDoc(collection(db, "messages"), newMessage);
  //   if (newMessageRef.id) {
  //     Alert.alert(`The message "${listMessage}" has been added.`);
  //   } else {
  //     Alert.alert("Unable to add. Please try later");
  //   }
  // };

  // const fetchMessages = async () => {
  //   const listsDocuments = await getDocs(collection(db, "messages"));
  //   let newMessages = [];
  //   listsDocuments.forEach((docObject) => {
  //     newMessages.push({ id: docObject.id, ...docObject.data() });
  //   });
  //   setMessages(newMessages);
  // };

  useEffect(() => {
    // onSnapshot is like an event listener looking for changes in your db collection named "messages", if triggered, will run the function
    const unsubMessages = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "desc")),
      (documentsSnapshot) => {
        let newMessages = [];
        // For each document, it will push the message with id, data, and createdAt.
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        setMessages(newMessages);
      }
    );

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  // Use pass callback function into setMessages to take current array and append new messages to it
  const onSend = (newMessages) => {
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, newMessages)
    // );
    addDoc(collection(db, "messages"), newMessages[0]);
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

  // useEffect to setup initial name of the screen
  useEffect(() => {
    navigation.setOptions(
      name ? { title: `${name}'s Chat Room` } : { title: "No Name Entered" }
    );

    // setMessages function to update state of messages
    // setMessages([
    //   {
    //     _id: 1,
    //     text: "Hello developer",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any",
    //     },
    //   },
    //   {
    //     _id: 2,
    //     text: name ? `${name} has entered chat` : "User has entered chat",
    //     createdAt: new Date(),
    //     system: true,
    //   },
    // ]);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {/* GiftedChat component with array of messages, renderBubble setttings, onSend function, and user id */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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
