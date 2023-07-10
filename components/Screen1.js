import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const Screen1 = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const image = require("../assets/BackgroundImage.png");
  const icon = require("../assets/profile.png");

  return (
    // <ScrollView style={{ height: "100%" }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <View style={styles.titleBox}>
            <Text style={styles.appTitle}>App Title</Text>
          </View>
          <View style={styles.actionBox}>
            <View style={styles.inputBox}>
              <Image style={styles.icon} source={icon} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Type your username here"
              />
            </View>
            <Text>Choose Background Color:</Text>
            <View style={styles.colorOptionContainer}>
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
            <Button
              style={styles.button}
              title="Start Chatting"
              onPress={() =>
                navigation.navigate("Screen2", { name: name, color: color })
              }
            />
          </View>
        </View>
      </ImageBackground>
    // </ScrollView>
  );
};

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
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "88%",
    justifyContent: "space-evenly",
  },
  icon: {
    width: 30,
    height: 30,
    opacity: 0.5,
  },
  inputBox: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#757083",
    flexDirection: "row",
    borderColor: "#757083",
  },
  input: {
    fontSize: 16,
    // fontWeight: 300,
    color: "#757083",
    // opacity: "50%",
  },
  

  button: {
    fontSize: 16,
    fontWeight: 600,
    color: "#FFFFFF",
    backgroundColor: "#757083",
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
    // backgroundColor: "green",
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
});

export default Screen1;
