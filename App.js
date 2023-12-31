import { useEffect } from "react";
import { Alert } from "react-native";
// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import netinfo for monitoring network connectivity
import { useNetInfo } from "@react-native-community/netinfo";

// import Google Firebase
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUbzH-mqrcCIGBW-FrJsZel_7P9ErECyo",
  authDomain: "chat-4ad5f.firebaseapp.com",
  projectId: "chat-4ad5f",
  storageBucket: "chat-4ad5f.appspot.com",
  messagingSenderId: "440234241007",
  appId: "1:440234241007:web:e14f99ed9605507e16a41a",
  measurementId: "G-1S5841S4N3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        {/* Different method of using Stack.Screen with props */}
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              db={db}
              storage={storage}
              isConnected={connectionStatus.isConnected}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
