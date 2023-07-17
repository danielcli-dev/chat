import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Screen2 = ({ route, navigation }) => {
  const { name } = route.params;
  const { color } = route.params;

  useEffect(() => {
    navigation.setOptions(
      name ? { title: name } : { title: "No Name Entered" }
    );
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text>Hello Screen2!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Screen2;
