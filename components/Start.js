import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const image = require("../assets/BackgroundImage.png");
  const icon = require("../assets/profile.png");
  const auth = getAuth();

  useEffect(() => {
    // Sets the name at the top of the screen
    navigation.setOptions({ title: "Chat App" });
  }, []);

  // Function for signing in anonymously through Google
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        // Navigated to Chat screen while passing params through route
        navigation.navigate("Chat", {
          name: name,
          color: color,
          userID: result.user.uid,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    // Set image background with resizeMode prop as cover
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        {/* Upper half of the screen */}
        <View style={styles.titleBox}>
          <Text style={styles.appTitle}>Chat App</Text>
        </View>

        {/* Lower half of the screen */}
        <View style={styles.actionBox}>
          {/* Input box contains icon and actual input field */}
          <View style={styles.inputBox}>
            <Image style={styles.icon} source={icon} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
          </View>
          <View>
            <Text style={styles.actionText}>Choose Background Color:</Text>
            <View style={styles.colorOptionContainer}>
              {/* All color icons have a view with white background and a touchable opacity for their unique colors*/}

              {/* Touchable opacity has a setColor function to update the state of color. The conditional operator will add the colorOptionActive style to the array if color matches correct hex color */}
              <View
                style={[
                  styles.colorOptionOuter,
                  color == "#090C08" ? styles.colorOptionActive : {},
                ]}
              >
                <TouchableOpacity
                  style={styles.option1}
                  onPress={() => {
                    setColor("#090C08");
                  }}
                />
              </View>
              <View
                style={[
                  styles.colorOptionOuter,
                  color == "#474056" ? styles.colorOptionActive : {},
                ]}
              >
                <TouchableOpacity
                  style={styles.option2}
                  onPress={() => {
                    setColor("#474056");
                  }}
                />
              </View>
              <View
                style={[
                  styles.colorOptionOuter,
                  color == "#8A95A5" ? styles.colorOptionActive : {},
                ]}
              >
                <TouchableOpacity
                  style={styles.option3}
                  onPress={() => {
                    setColor("#8A95A5");
                  }}
                />
              </View>
              <View
                style={[
                  styles.colorOptionOuter,
                  color == "#B9C6AE" ? styles.colorOptionActive : {},
                ]}
              >
                <TouchableOpacity
                  style={styles.option4}
                  onPress={() => {
                    setColor("#B9C6AE");
                  }}
                />
              </View>
            </View>
          </View>

          {/* Touchable Opacity has an onPress prop that trigger arrow function containing navigate function to go to Chat screen with params name and color */}
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            {/* Inner text of touchable opacity */}
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional operator add the KeyboardAvoidingView component if mobile OS used is an Andriod */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    </ImageBackground>
  );
};

// StyleSheet with different styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "6%",
  },
  image: {
    flex: 1,
  },
  titleBox: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  appTitle: {
    fontSize: 45,
    fontWeight: 600,
    color: "#FFFFFF",
  },

  actionBox: {
    height: 275,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "88%",
    justifyContent: "space-evenly",
  },

  inputBox: {
    width: "88%",
    padding: 15,
    borderWidth: 1.5,
    fontSize: 16,
    color: "#757083",
    flexDirection: "row",
    borderColor: "#757083",
    opacity: 0.5,
    borderRadius: 2,
  },
  icon: {
    width: 30,
    height: 30,
    opacity: 0.5,
    marginRight: 4,
  },
  input: {
    fontSize: 16,
    color: "#757083",
    flex: 1,
  },

  actionText: {
    fontSize: 16,
    fontWeight: 300,
    color: "#757083",
    opacity: 1,
  },
  colorOptionContainer: {
    flexDirection: "row",
  },
  colorOptionOuter: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  colorOptionActive: {
    borderWidth: 1,
    borderColor: "black",
  },

  option1: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#090C08",
  },

  option2: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#474056",
  },

  option3: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#8A95A5",
  },

  option4: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#B9C6AE",
  },

  button: {
    width: "88%",
    padding: 10,
    height: 60,

    backgroundColor: "#757083",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { fontSize: 16, fontWeight: 600, color: "#FFFFFF" },
});

export default Start;
