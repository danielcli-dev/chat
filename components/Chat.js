import { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  // Assigning params to variables
  const { name } = route.params;
  const { color } = route.params;

  // Create messages array for holding list of messages
  const [messages, setMessages] = useState([]);

  // Use pass callback function into setMessages to take current array and append new messages to it
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
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
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: name ? `${name} has entered chat` : "User has entered chat",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {/* GiftedChat component with array of messages, renderBubble setttings, onSend function, and user id */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
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
